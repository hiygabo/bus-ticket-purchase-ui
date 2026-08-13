import { useEffect, useState } from "react";
import { getStops } from "../../services/stopService";
import { getTravels } from "../../services/travelService";
import { useLocation } from "react-router-dom";

function TravelSearchForm() {
    const location = useLocation();
    const { passengerId, ci, full_name} = location.state || {};
    const [stops, setStops] = useState<Stop[]>([]);
    const [availableTravels, setAvailableTravels] = useState<Travel[]>([]);
    const [searchData, setSearchData] = useState({
        id_origin_stop: "",
        id_destiny_stop: "",
        departure_date: ""
    });

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

        try {
            const allTravels = await getTravels();

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
                <strong>NAME:</strong> {full_name}
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
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default TravelSearchForm;
