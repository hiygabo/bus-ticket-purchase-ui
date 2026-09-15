import { getUserTravels } from "../../services/TravelDetailService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./MyTravels.css";

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
        <div className="my-travels">
            <h2 className="my-travels__title">MY TRAVELS</h2>
            {travels.length === 0 ? (
                <p className="my-travels__empty">You have no travels yet. Book your first ticket!</p>
            ) : (
            <ul className="my-travels__list">
            {travels.map((ticket: any) => (
                <li className="travel-card" key={ticket.id_detail}>
                    <p className="travel-card__route">
                        <span>{ticket.travel?.travel_origin?.place?.place_name}</span>
                        <span className="travel-card__arrow" aria-hidden="true">→</span>
                        <span>{ticket.travel?.travel_destiny?.place?.place_name}</span>
                    </p>
                    <span className="travel-card__ticket">Ticket Nº {ticket.id_detail}</span>
                    <p className="travel-card__meta travel-card__meta--date"><strong>Date</strong><span>{ticket.travel?.departure_date}</span></p>
                    <p className="travel-card__meta travel-card__meta--time"><strong>Departure</strong><span>{ticket.travel?.schedule?.departure_time}</span></p>
                </li>
            ))}
            </ul>
            )}
        </div>
    )
}
export default MyTravels;