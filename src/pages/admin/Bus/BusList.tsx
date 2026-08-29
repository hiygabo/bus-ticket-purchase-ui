import { getBuses } from "../../../services/BusService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BusList(){
    const [buses, setBuses] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBuses = async () =>{
            try{
                const data = await getBuses();
                setBuses(data);
            }catch(error){
                console.error("Error fetching buses", error);
            }
            
        }
        fetchBuses();

    }, [])

    const handleGoToEdit = (bus: any) => {
        navigate(`/edit-bus/${bus.id_bus}`, {state: {busInfo:bus}})
    }

    return(
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>ID BUS</th>
                        <th>Bus Plate</th>
                        <th>State</th>
                        <th>Category</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <tr key={bus.id_bus}>
                            <td>{bus.id_bus}</td>
                            <td>{bus.bus_plate}</td>
                            <td>{bus.bus_state}</td>
                            <td>{bus.category?.category_name}</td>
                            <td>
                                <button onClick={() => handleGoToEdit(bus)}>
                                    Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-btn" onClick={() => navigate("/admin")}>
                ← Back
            </button>
        </div>
    );
}
export default BusList;