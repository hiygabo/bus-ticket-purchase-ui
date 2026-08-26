import { useEffect, useState } from "react";
import { editTravel } from "../../../services/TravelService";
import { useLocation, useNavigate } from "react-router-dom";
import { getBuses } from "../../../services/BusService";
import { getStops } from "../../../services/StopService";
import { getSchedules } from "../../../services/ScheduleService";
function EditTravel () {
    const location = useLocation();
    const navigate = useNavigate();
    const travelInfo = location.state?.travelInfo;
    const [departureDate, setDepartureDate] = useState(travelInfo?.departure_date || "");
    const [price, setPrice] = useState(travelInfo?.price || "");
    const [status, setStatus] = useState(travelInfo?.status || "ACTIVE");
    const [buses, setBuses] = useState<any[]>([]);
    const [busId, setBusId] = useState(travelInfo?.bus?.id_bus || "");
    const [stops, setStops] = useState<any[]>([]);
    const [idOrigin, setIdOrigin] = useState(travelInfo.travel_origin?.id_stop || "");
    const [idDestiny, setIdDestiny] = useState(travelInfo.travel_destiny?.id_stop || "");
    const [schedules, setSchedules] = useState<any[]>([]);
    const [idSchedule, setIdSchedule] = useState(travelInfo.schedule?.id_schedule || "");
    
    useEffect(() => {
        const fetchStops = async () => {
            try{
                const data = await getStops();
                if(Array.isArray(data)){
                    setStops(data)
                }else if (data && Array.isArray(data.data)){
                    setStops(data.data);
                } else {
                    console.warn(data);
                    setStops([]);
                }
            }catch(error){
                console.error("Error fetching stops", error)
            }
        }
        fetchStops();
    },[])

    useEffect (() => {
        const fetchSchedules = async () => {
            try{
                const data = await getSchedules();
                if(Array.isArray(data)){
                    setSchedules(data);
                }else if (data && Array.isArray(data.data)){
                        setSchedules(data.data)
                } else {
                    console.warn(data);
                    setSchedules([]);
                }
                
            }catch(error){
                console.error("Error fetching schedules", error);
            }
        }
        fetchSchedules();
    },[])

    useEffect(() => {
        const fetchBuses = async () => {
            try{
                const data = await getBuses();
                if(Array.isArray(data)){
                    setBuses(data);
                }else if (data && Array.isArray(data.data)){
                    setBuses(data.data);
                }else {
                    console.warn(data);
                    setBuses([]);
                }
            }catch(error){
                console.error("Error fetching buses", error);
            }
        }
        fetchBuses();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            departure_date : departureDate,
            price: Number(price),
            status: status,
            id_bus: Number(busId),
            id_origin_stop : Number(idOrigin),
            id_destiny_stop: Number(idDestiny),
            id_schedule: Number(idSchedule),
        }
        try{
            await editTravel(travelInfo.id_travel, payload);
            alert("Travel edited succesfully");
            navigate("/travel-list");
        }catch(error){
            console.error("Error to saving travel data", error);
        }
    }


    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Edit travel {travelInfo.id_travel}</h2>
                <div>
                    <label>Departure Date</label>
                    <input type="date" value={departureDate} onChange={(e)=> setDepartureDate(e.target.value)} required />
                </div>
                <div>
                    <label> Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </div>
                <div>
                    <label>Status</label>
                    {/* <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required /> */}
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div>
                <div>
                    <label>Bus</label>
                    <select value={busId} onChange={(e) => setBusId(e.target.value)} required>
                        <option value="">Select a bus...</option>
                        {Array.isArray(buses) && buses.map((bus) => (
                            <option key={bus.id_bus} value={bus.id_bus}>
                                {bus.bus_plate}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Origin</label>
                    <select value={idOrigin} onChange={(e) => setIdOrigin(e.target.value)} required>
                        <option value="">Select an origin...</option>
                        {Array.isArray(stops) && stops.map((stop) => (
                            <option key={stop.id_stop} value={stop.id_stop}>
                                {stop.stop_name} - {stop.place?.place_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Destiny</label>
                    <select value={idDestiny} onChange={(e) => setIdDestiny(e.target.value)} required>
                        <option value="">Select an destiny...</option>
                        {Array.isArray(stops) && stops.map((stop) => (
                            <option key={stop.id_stop} value={stop.id_stop}>
                                {stop.stop_name} - {stop.place?.place_name} 
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                <label>Schedule (Departure - Arrival)</label>
                    <select value={idSchedule} onChange={(e) => setIdSchedule(e.target.value)} required>
                    <option value="" disabled>Select a schedule...</option>
                    {Array.isArray(schedules) && schedules.map((schedule) => (
                    <option key={schedule.id_schedule} value={schedule.id_schedule}>
                        Departure Time: {schedule.departure_time} | Arrival Time: {schedule.estimated_arrival_time} | Travel Time: {schedule.estimated_travel_time}
                    </option>
                    ))}
                    </select>
                </div>

                <button type="submit">
                    SAVE CHANGES
                </button>
            </form>
            <button className="back-btn" onClick={() => navigate("/admin")}>
                ← Back
            </button>
        </>
    )

}
export default EditTravel;