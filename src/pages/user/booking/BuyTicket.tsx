import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createTravelDetail } from "../../../services/TravelDetailService";
import { getOccupiedSeats } from "../../../services/TravelDetailService";
import { jwtDecode } from "jwt-decode";

function BuyTicket(){

    const [selectedSeat, setSelectedSeat] = useState<any>(null);
    const [occupiedSeats, setOcuppiedSeats] = useState<number[]>([]);
    const [purchasedTicketId, setPurchasedTicketId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        passenger_full_name: '',
        passenger_ci: ''
    })

    const location = useLocation();
    const navigate = useNavigate();
    const travel = location.state?.travel;
    const origin = travel.travel_origin;
    const destiny = travel.travel_destiny;
    const seatsList = travel.bus?.seats || [];
    const sortedSeats = [...seatsList].sort((a,b) => a.seat_number - b.seat_number);
    const tkUName = localStorage.getItem('admin_token');
    let userName = "Traveler";
    if(tkUName) {
        try{
            const decodedToken: any = jwtDecode(tkUName);
            userName = decodedToken.full_name || "Traveler";
        } catch(error){
            console.error("Error to decodificate token", error);
        }
    }

    useEffect(() => {

        if(travel?.id_travel) {
            const fetchOccupiedSeats = async () => {
                try{
                    const data = await getOccupiedSeats(travel.id_travel);
                    setOcuppiedSeats(data);
                }catch(error){
                    Swal.fire("Error", "Error fetching occupied seats", "error");
                    console.error(error);
                }
            }
            fetchOccupiedSeats();
        }

    },[travel]);



    if(!travel) {
        return <h2>404 Travel Not Found</h2>
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }



    const handleBuyTicket = async () => {
        if (!selectedSeat) {
            Swal.fire("Warning", "Please select a seat first", "warning");
            return;
        }
        const token = localStorage.getItem('admin_token');
        const decodedToken = jwtDecode(token);
        const id_user = decodedToken.sub;

        const payload = {
            ticket_price : Number(travel.price),
            id_travel: Number(travel.id_travel),
            id_seat: Number(selectedSeat.id_seat),
            passenger_full_name: formData.passenger_full_name,
            passenger_ci: formData.passenger_ci,
            id_user: Number(id_user),
        }

        try{
            const result = await createTravelDetail(payload);
            if(result && result.id_detail){
                setPurchasedTicketId(result.id_detail);
                console.log("Ticket saved", result);
                Swal.fire("Success", "Ticket Bought successfully!!", "success")
            }else{
                Swal.fire("Error", "Error to save ticket", "error")
            }

        }catch (error) {
            console.error("error", error);
        }
    };



    if(purchasedTicketId !== null){
        return(
            <>
                <h2>THANK YOU, {userName} your ticket has been generated correctly</h2>
                <div className="ticket-box">
                    <p className="ticket-box__route">
                        <span className="ticket-box__origin">{origin?.place?.place_name}</span>
                        <span className="ticket-box__arrow" aria-hidden="true">→</span>
                        <span className="ticket-box__destiny">{destiny?.place?.place_name}</span>
                    </p>
                    <ul className="ticket-box__details">
                        <li><span>Travel</span><strong>Nº {travel.id_travel}</strong></li>
                        <li><span>Date</span><strong>{travel.departure_date}</strong></li>
                        <li><span>Departure</span><strong>{travel.schedule?.departure_time}</strong></li>
                        <li><span>Arrival</span><strong>{travel.schedule?.estimated_arrival_time}</strong></li>
                        <li><span>Seat</span><strong>{selectedSeat?.seat_number}</strong></li>
                        <li><span>Price</span><strong>Bs. {travel.price}</strong></li>
                    </ul>
                </div>
                <p>Next Steps:</p>
                <ul>
                    <li>Click "Download ticket" to download your ticket</li>
                    <li>Save the ticket printed or digital</li>
                    <li>Present the ticket on TRANS COPACABANA S.A at your travel day</li>
                </ul>



                <div className="ticket-actions">
                    <a href={`http://localhost:3000/travel-detail/${purchasedTicketId}/ticket`}
                        target="_blank">
                        DOWNLOAD TICKET
                    </a>
                    <button onClick={() => navigate("/")}>
                        Back to home
                    </button>
                </div>
            </>
        )
    }



    return(
        <>
            <h2>STEP 3 COMPLETE DATA TRAVEL</h2>
            <h3>PLEASE, COMPLETE DATA INFORMATION ABOUT PASSENGERS THAT TAKE THE TRAVEL</h3>
            <form onSubmit={handleBuyTicket}>
                <label> FULL_NAME:</label>
                <input name="passenger_full_name" type="text" value={formData.passenger_full_name} onChange={handleChange} required/>
                <label> CI:</label>
                <input type="text" name="passenger_ci" value={formData.passenger_ci} onChange={handleChange} required />
                 <h3>DATA TRAVEL</h3>
                <strong>TRAVEL Nº:{travel.id_travel}</strong>
                <strong> DATE: {travel.departure_date}</strong>
                <strong>DEPARTURE TIME: {travel.schedule?.departure_time}</strong>
                <strong>ESTIMATED ARRIVAL TIME: {travel.schedule?.estimated_arrival_time}</strong>
                <strong>ESTIMATED TRAVEL TIME: {travel.schedule?.estimated_travel_time}</strong>
                <strong>PRICE: {travel.price}</strong>
                <strong>BUS PLATE: {travel.bus?.bus_plate}</strong>
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
                            return (
                                <button
                                    key={seatInfo.id_seat}
                                    onClick={() => !occupied && setSelectedSeat(seatInfo)}
                                    disabled={occupied}
                                    style={{
                                        backgroundColor: selected ? '#4CAF50' : occupied ? '#f44336' : '#fff',
                                        color: selected || occupied ? '#fff' : '#333',
                                    }}
                                >
                                    {seatInfo.seat_number}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
                <button type="submit">
                    BUY
                </button>
            </form>
        </>
    )
}

export default BuyTicket;