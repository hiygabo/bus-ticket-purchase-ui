import { useEffect, useState } from "react";
import { getStops } from "../../../services/StopService";
import { getActiveTravels } from "../../../services/TravelService";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Tooltip } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Stop = {
    id_stop: number;
    stop_name: string;
    place?: { place_name?: string };
};

type Travel = {
    id_travel: number;
    departure_date: string;
    price?: number | string;
    schedule?: {
        departure_time?: string;
        estimated_arrival_time?: string;
        estimated_travel_time?: string;
    };
    travel_origin?: any;
    travel_destiny?: any;
    route?: any;
    bus?: {
        bus_plate?: string;
        seats?: Array<{ id_seat: number; seat_number: number }>;
    };
};

const originIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const destinyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
function MapAutoZoom({routeData}: { routeData: any}) {
    const map = useMap();
    useEffect(() => {
        if (routeData) {
            const layer = L.geoJSON(routeData);
            map.fitBounds(layer.getBounds(), {padding: [50,50]})
        }
    }, [routeData, map]);
    return null;
}
function TravelSearchForm() {
    const location = useLocation();
    const { ci, full_name, passengerId} = location.state || {};
    const [stops, setStops] = useState<Stop[]>([]);
    const [availableTravels, setAvailableTravels] = useState<Travel[]>([]);
    const [searchData, setSearchData] = useState({
        id_origin_stop: "",
        id_destiny_stop: "",
        departure_date: ""
    });
    const [selectedTravelForMap, setSelectedTravelForMap] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStops = async () => {
            try {
                const data = await getStops();
                setStops(data);
            } catch (error) {
                console.error("Error fetching stops", error);
            }
        };

        fetchStops();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedTravelForMap(null);
        try {
            const allTravels = await getActiveTravels();

            const filterTravels = allTravels.filter((travel: any) => {
                const originNumber = parseInt(searchData.id_origin_stop, 10);
                const destinyNumber = parseInt(searchData.id_destiny_stop, 10);

                const origin = travel.travel_origin?.id_stop === originNumber;
                const destiny = travel.travel_destiny?.id_stop === destinyNumber;
                const date = travel.departure_date === searchData.departure_date;

                return origin && destiny && date;
            });

            setAvailableTravels(filterTravels);

            if (filterTravels.length === 0) {
                alert("There aren't available travels on this date and route");
            }
        } catch (error) {
            console.error("Error to search travels", error);
        }
    };
    

    return (
        <>
        <h1> SEARCH YOUR TRAVEL</h1>
        {full_name && (
            <div>
                <strong>NAME:</strong> {full_name} <br />
                <strong>CI:</strong> {ci}
            </div>
        )}
            <form onSubmit={handleSearch}>
                <div>
                    <label>ORIGIN</label>
                    <select
                        name="id_origin_stop"
                        id="id_origin_stop"
                        value={searchData.id_origin_stop}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Origin...</option>
                        {stops.map((stop) => (
                            <option key={stop.id_stop} value={stop.id_stop}>
                                {stop.place?.place_name} - {stop.stop_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>DESTINY</label>
                    <select
                        name="id_destiny_stop"
                        id="id_destiny_stop"
                        value={searchData.id_destiny_stop}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Destiny...</option>
                        {stops
                            .filter((stop) => stop.id_stop.toString() !== searchData.id_origin_stop)
                            .map((stop) => (
                                <option key={stop.id_stop} value={stop.id_stop}>
                                    {stop.place?.place_name} - {stop.stop_name}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label>DATE</label>
                    <input
                        type="date"
                        name="departure_date"
                        value={searchData.departure_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">SEARCH TRAVELS</button>
            </form>

            {availableTravels.length > 0 && (
                <div>
                    <h3>Available Travels</h3>
                    <ul>
                        {availableTravels.map(travel => (
                            <li key={travel.id_travel}>
                                Date: {travel.departure_date} <br />
                                Departure Time: {travel.schedule?.departure_time} <br />
                                Estimated Arrival time: {travel.schedule?.estimated_arrival_time}
                                <button onClick={() => setSelectedTravelForMap(travel)}>
                                    VIEW ROUTE
                                </button>
                                <button onClick={() => navigate("/buy-ticket", {
                                    state: { travel: travel,
                                            full_name: full_name,
                                            ci: ci,
                                            passengerId: passengerId
                                     }
                                })}>
                                    BUY TICKET
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedTravelForMap && (
                <div style={{ marginTop: '30px', border: '2px solid #ccc', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Travel Map</h3>
                        <p>This is the route on the travel</p>
                        <p>Estimated travel time: {selectedTravelForMap.schedule?.estimated_travel_time} </p>
                        <button onClick={() => setSelectedTravelForMap(null)} style={{ background: 'red', color: 'white' }}>
                            ✖ Close Map
                        </button>
                    </div>
                    
                    <div style={{ height: '400px', width: '100%', marginTop: '10px' }}>
                        <MapContainer 
                            center={[-16.4897, -68.1193]} 
                            zoom={6} 
                            style={{ height: '100%', width: '100%', zIndex: 1 }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <GeoJSON 
                                key={JSON.stringify(selectedTravelForMap.route)} 
                                data={selectedTravelForMap.route} 
                                style={{ color: 'blue', weight: 5 }} 
                            />
                            <MapAutoZoom routeData={selectedTravelForMap.route}/>

                            {selectedTravelForMap.travel_origin?.location?.coordinates && (
                                <Marker 
                                icon={originIcon}
                                position={[
                                    selectedTravelForMap.travel_origin.location.coordinates[1], 
                                    selectedTravelForMap.travel_origin.location.coordinates[0]  
                                ]}>
                                    <Tooltip permanent direction="top" offset={[0, -40]}>
                                        <strong>Origin:</strong> <br/>
                                        {selectedTravelForMap.travel_origin.stop_name}
                                    </Tooltip>
                                </Marker>
                            )}
                            {selectedTravelForMap.travel_destiny?.location?.coordinates && (
                                <Marker 
                                icon={destinyIcon}
                                position={[
                                    selectedTravelForMap.travel_destiny.location.coordinates[1], 
                                    selectedTravelForMap.travel_destiny.location.coordinates[0]  
                                ]}>
                                    <Tooltip permanent direction="top" offset={[0, -40]}>
                                        <strong>Destiny:</strong> <br/>
                                        {selectedTravelForMap.travel_destiny.stop_name}
                                    </Tooltip>
                                </Marker>
                            )}
                        </MapContainer>
                    </div>
                </div>
            )}
        </>
    );
}

export default TravelSearchForm;
