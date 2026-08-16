import { useLocation } from "react-router-dom";

function BuyTicket(){
    const location = useLocation();
    const travel = location.state?.travel;
    const origin = travel.travel_origin;
    const destiny = travel.travel_destiny;
    const full_name= location.state?.full_name;
    const CI = location.state?.ci;
    if(!travel) {
        return <h2>404 Travel Not Found</h2>

    }

    return(

        <>
            <h2>STEP 3 CHECK DATA TRAVEL</h2>

            <h3>YOUR DATA</h3>

            <strong>FULL NAME: {full_name}</strong>
            <strong>CI: {CI}</strong>
            <strong>TRAVEL Nº:{travel.id_travel}</strong>
            <strong> DATE: {travel.departure_date}</strong>
            <strong>DEPARTURE TIME: {travel.schedule?.departure_time}</strong>
            <strong>ESTIMATED ARRIVAL TIME: {travel.schedule?.estimated_arrival_time}</strong>
            <strong>ESTIMATED TRAVEL TIME: {travel.schedule?.estimated_travel_time}</strong>

            <div>
                <p>ORIGIN: {origin?.place?.place_name} - {travel.travel_origin?.stop_name} </p>
            </div>
            <div>
                <p>DESTINY: {destiny?.place?.place_name} - {travel.travel_destiny?.stop_name}</p>
            </div>

            <h2>STEP 4 SELECT YOUR SEAT</h2>
        
        </>
    )

}
export default BuyTicket;