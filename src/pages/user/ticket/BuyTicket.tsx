import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createTravelDetail } from "../../../services/TravelDetailService";
function BuyTicket(){
    const [selectedSeat, setSelectedSeat] = useState<any>(null);
    const location = useLocation();
    const travel = location.state?.travel;
    const origin = travel.travel_origin;
    const destiny = travel.travel_destiny;
    const full_name= location.state?.full_name;
    const CI = location.state?.ci;
    const passengerId = location.state?.passengerId;
    const seatsList = travel.bus?.seats || [];
    const sortedSeats = [...seatsList].sort((a,b) => a.seat_number - b.seat_number);

    if(!travel) {
        return <h2>404 Travel Not Found</h2>

    }

    const handleBuyTicket = async () => {
        if (!selectedSeat) {
            alert("Please select a seat first");
            return;
        }

        const payload = {
            ticket_price : 50,
            id_travel: Number(travel.id_travel),
            id_seat: Number(selectedSeat.id_seat),
            id_passenger: Number(passengerId)
        }

        try{
            const result = await createTravelDetail(payload);
            console.log("Ticket saved", result);
            alert("Ticket Bought successfully!!")
        }catch (error) {
            console.error("error", error);
        }


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
                        gridTemplateColumns: 'repeat(4, 60px)', // 4 columnas de 60px
                        gap: '15px', // Espacio entre asientos
                        justifyContent: 'center'
                    }}>
                        {sortedSeats.map((seatInfo: any) => (
                            <button key={seatInfo.id_seat} 
                            onClick={() => setSelectedSeat(seatInfo)}
                            style={{
                                    padding: '15px 0',
                                    // Verificamos si el ID del asiento seleccionado es igual al de este botón
                                    backgroundColor: selectedSeat?.id_seat === seatInfo.id_seat ? '#4CAF50' : '#fff',
                                    color: selectedSeat?.id_seat === seatInfo.id_seat ? '#fff' : '#333',
                                    border: selectedSeat?.id_seat === seatInfo.id_seat ? '2px solid #388E3C' : '2px solid #ccc',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {seatInfo.seat_number}
                            </button>
                        ))}

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