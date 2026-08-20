import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTravelDetail } from "../../../services/TravelDetailService";
import { getOccupiedSeats } from "../../../services/TravelDetailService";
function BuyTicket(){
    const [selectedSeat, setSelectedSeat] = useState<any>(null);
    const [occupiedSeats, setOcuppiedSeats] = useState<number[]>([]);
    const [purchasedTicketId, setPurchasedTicketId] = useState<number | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const travel = location.state?.travel;
    const origin = travel.travel_origin;
    const destiny = travel.travel_destiny;
    const full_name= location.state?.full_name;
    const CI = location.state?.ci;
    const passengerId = location.state?.passengerId;
    const seatsList = travel.bus?.seats || [];
    const sortedSeats = [...seatsList].sort((a,b) => a.seat_number - b.seat_number);

    useEffect(() => {
        if(travel?.id_travel) {
            const fetchOccupiedSeats = async () => {
                try{
                    const data = await getOccupiedSeats(travel.id_travel);
                    setOcuppiedSeats(data);
                }catch(error){
                    alert("Error fetching occupied seats");
                    console.error(error);
                }
            }
            fetchOccupiedSeats();
        }
    },[travel]);

    if(!travel) {
        return <h2>404 Travel Not Found</h2>

    }

    const handleBuyTicket = async () => {
        if (!selectedSeat) {
            alert("Please select a seat first");
            return;
        }

        const payload = {
            ticket_price : Number(travel.price),
            id_travel: Number(travel.id_travel),
            id_seat: Number(selectedSeat.id_seat),
            id_passenger: Number(passengerId)
        }

        try{
            const result = await createTravelDetail(payload);
            if(result && result.id_detail){
                setPurchasedTicketId(result.id_detail);
                console.log("Ticket saved", result);
                alert("Ticket Bought successfully!!")
            }else{
                alert("Error to save ticket")
            }
        }catch (error) {
            console.error("error", error);
        }

    };

    if(purchasedTicketId !== null){
        return(
            <>
                <h2>THANK YOU, {full_name}, your ticket has been generated correctly</h2>
                <p>Next Steps:</p>
                <ul>
                    <li>Click "Download ticket" to download your ticket</li>
                    <li>Save the ticket printed or digital</li>
                    <li>Present the ticket on TRANS COPACABANA S.A at your travel day</li>

                    <a href={`http://localhost:3000/travel-detail/${purchasedTicketId}/ticket`}
                        target="_blank"
                    >
                        DOWNLOAD TICKET
                    </a>
                    <button onClick={() => navigate("/")}>
                        Back to home
                    </button>
                </ul>
            </>
        )
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
            bus: {travel.bus?.bus_plate}
            <div>
                <p>ORIGIN: {origin?.place?.place_name} - {travel.travel_origin?.stop_name} </p>
            </div>
            <div>
                <p>DESTINY: {destiny?.place?.place_name} - {travel.travel_destiny?.stop_name}</p>
            </div>

            <h2>STEP 4 SELECT YOUR SEAT</h2>
            <div style={{ 
                backgroundColor: '#eee', 
                padding: '30px', 
                borderRadius: '10px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}>

                {sortedSeats.length === 0 ? (
                    <p>No seats found for this bus</p>
                ): (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 60px)', 
                        gap: '15px', 
                        justifyContent: 'center'
                    }}>
                        {sortedSeats.map((seatInfo: any) => {
                            const occupied = occupiedSeats.includes(seatInfo.id_seat);
                            const selected = selectedSeat?.id_seat === seatInfo.id_seat;

                            let bgColor = '#fff';
                            let textColor = '#333';
                            if(selected){
                                bgColor = '#4CAF50';
                                textColor = '#fff';
                            }else if(occupied) {
                                bgColor = '#f44336';
                                textColor = '#fff';
                            }
                            return (
                                <button
                                    key={seatInfo.id_seat}
                                    onClick={() => !occupied && setSelectedSeat(seatInfo)}
                                    disabled={occupied}
                                >
                                    {seatInfo.seat_number}
                                </button>
                            )
                        })}

                    </div> 
 
                )}
                <button onClick={handleBuyTicket}>
                    BUY
                </button>



            </div>

        </>
    )

}
export default BuyTicket;