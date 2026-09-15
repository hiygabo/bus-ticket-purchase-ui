import { getUserTravels } from "../../services/TravelDetailService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function MyTravels(){
    const [travels, setTravels] = useState<any>([]);



    useEffect(()=> {
        const fetchTravels = async (id_user:number) => {
            try{
                const data = await getUserTravels(id_user);
                setTravels(data);
            } catch(error){
                console.error("Error fetching travels", error);
            }
        };
        const token = localStorage.getItem("admin_token");
         if(token) {
            try{
                const decodedToken: any = jwtDecode(token);
                const id_user = Number(decodedToken.sub);
                fetchTravels(id_user);
            }catch(error){
                console.error("Error to decode token", error);
            }
         }
    }, [])

    return(
        <div>
            <h2>MY TRAVELS</h2>
            {travels.map((ticket: any) => (
                <div key={ticket.id_detail}>
                    <strong> {ticket.travel?.travel_origin?.place?.place_name} -------- {ticket.travel?.travel_destiny?.place?.place_name}</strong>
                    <p>Date: {ticket.travel?.departure_date}</p>
                    <p>Departure time: {ticket.travel?.schedule?.departure_time}</p>
                </div>
            ))}
        </div>
    )
}
export default MyTravels;