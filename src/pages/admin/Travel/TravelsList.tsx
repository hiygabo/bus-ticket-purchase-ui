import { useState, useEffect } from "react";
import { getTravels, desactivateTravel } from "../../../services/TravelService";
import { useNavigate } from "react-router-dom";

function TravelList(){
    const [travels, setTravels] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravels = async () => {
            try{
                const data = await getTravels();
                setTravels(data);
            }catch(error){
                console.error ("Error fetching travels", error);
            }
        }
        fetchTravels();
    }, [])

    const handleGoToEdit = async (travel: any) => {
        navigate(`/edit-travel/${travel.id_travel}`, {state: {travelInfo : travel}})
    }

    const handleDesactivateTravel = async (id: number) => {
        const confirm = window.confirm("Are you sure to desactivate this travel?")
        if(!confirm) return;

        try{
            await desactivateTravel(id);
            setTravels(prevTravels => 
                prevTravels.map(travel => 
                    travel.id_travel === id ? {...travel, status: 'INACTIVE'}: travel
                )
            )
            
        }catch(error){
            console.error("Error to desactivate travel", error);
        }


    }

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Origin</th>
                    <th>Destiny</th>
                    <th>Date</th>
                    <th>price</th>
                    <th>state</th>
                    <th>accion</th>
                </tr>
            </thead>
            <tbody>
                {travels.map((travel) => (
                    <tr key={travel.id_travel}>
                        <td>{travel.id_travel}</td>
                        <td>{travel.travel_origin?.place?.place_name}</td>
                        <td>{travel.travel_destiny?.place?.place_name}</td>
                        <td>{travel.departure_date}</td>
                        <td>{travel.price}</td>
                        <td>{travel.status}</td>
                        <td>
                            <button onClick={() => handleDesactivateTravel(travel.id_travel)}>
                                {travel.status === 'ACTIVE' ? 'DISABLE': 'INACTIVE'}
                            </button>
                            <button onClick={() => handleGoToEdit(travel)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TravelList;