import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createTravelDetail } from "../../../services/TravelDetailService";
import { getOccupiedSeats } from "../../../services/TravelDetailService";
import { createPayment } from "../../../services/PaymentService";
import { getPaymentTypes } from "../../../services/PaymentService";
import { jwtDecode } from "jwt-decode";

function BuyTicket(){

    const [selectedSeat, setSelectedSeat] = useState<any>(null);
    const [occupiedSeats, setOcuppiedSeats] = useState<number[]>([]);
    const [purchasedTicketId, setPurchasedTicketId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        passenger_full_name: '',
<<<<<<< HEAD
        passenger_ci: ''
    })
    const location = useLocation();
    const navigate = useNavigate();
    const travel = location.state?.travel;
    const origin = travel.travel_origin;
    const destiny = travel.travel_destiny;
    const seatsList = travel.bus?.seats || [];
    const sortedSeats = [...seatsList].sort((a,b) => a.seat_number - b.seat_number);
    
=======
        passenger_ci: '',
        transaction_code: ''
    })

    const location = useLocation();
    const navigate = useNavigate();
    const travel = location.state?.travel;
    const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
    const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<any>(null);

>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2
    useEffect(() => {
        if(!travel) {
            navigate('/travel-search')
        }
    }, [travel, navigate])

    useEffect(() => {
        const fetchPaymentsTypes = async () => {
            try{
                const types = await getPaymentTypes();
                setPaymentTypes(types);
            }catch (error) {
                console.error("Error fetching types", error);
            }
        }
        fetchPaymentsTypes();
    }, [])

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
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

<<<<<<< HEAD
    const handleBuyTicket = async (e) => {
=======


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }



    const handleBuyTicket = async (e: React.FormEvent) => {
>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2
        e.preventDefault();
        if (!selectedSeat) {
            Swal.fire("Warning", "Please select a seat first", "warning");
            return;
        }

        if (!selectedPaymentTypes) {
            Swal.fire("Warning", "Please select a payment method", "warning");
            return;
        }
        const token = localStorage.getItem('admin_token');
        if(!token) {
            Swal.fire("Error", "You must be logged in to buy a ticket", "error");
            navigate('/login');
            return;
        }
        const decodedToken = jwtDecode(token);
        const id_user = decodedToken.sub;

        const ticketPayload = {
            ticket_price : Number(travel.price),
            id_travel: Number(travel.id_travel),
            id_seat: Number(selectedSeat.id_seat),
            passenger_full_name: formData.passenger_full_name,
            passenger_ci: formData.passenger_ci,
<<<<<<< HEAD


        }
=======
            id_user: Number(id_user),
        };
>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2

        try{
            const ticketResult = await createTravelDetail(ticketPayload);
            const ticketId = ticketResult?.id_detail || ticketResult?.data?.id_detail || ticketResult?.id;

            if(ticketId) {
                const paymentPayload = {
                    amount: Number(travel.price),
                    transaction_code: formData.transaction_code,
                    id_payment_type: Number(selectedPaymentTypes.id_payment_type),
                    id_travel_detail: Number(ticketId)
                };

                await createPayment(paymentPayload);

                setPurchasedTicketId(ticketId);
                Swal.fire("Success", "Ticket and payment processed successfully", "success");
            }
        }catch (error) {
            console.error("error", error);
        }
    };



    if(purchasedTicketId !== null){
        return(
            <>
<<<<<<< HEAD
                <h2>THANK YOU,  your ticket has been generated correctly</h2>

=======
                <h2>THANK YOU, {userName} your ticket has been generated correctly</h2>
>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2
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
        <div className="buy-ticket">
            <h2 className="buy-step">STEP 3 COMPLETE DATA TRAVEL</h2>
            <h3 className="buy-subtitle">PLEASE, COMPLETE DATA INFORMATION ABOUT PASSENGERS THAT TAKE THE TRAVEL</h3>
            <form className="buy-form" onSubmit={handleBuyTicket}>
                <label> FULL_NAME:</label>
                <input name="passenger_full_name" type="text" value={formData.passenger_full_name} onChange={handleChange} required/>
                <label> CI:</label>
                <input type="text" name="passenger_ci" value={formData.passenger_ci} onChange={handleChange} required />
                 <h3 className="buy-section">DATA TRAVEL</h3>
                <strong>TRAVEL Nº:{travel.id_travel}</strong>
                <strong> DATE: {travel.departure_date}</strong>
                <strong>DEPARTURE TIME: {travel.schedule?.departure_time}</strong>
                <strong>ESTIMATED ARRIVAL TIME: {travel.schedule?.estimated_arrival_time}</strong>
                <strong>ESTIMATED TRAVEL TIME: {travel.schedule?.estimated_travel_time}</strong>
                <strong>PRICE: {travel.price}</strong>
                <strong>BUS PLATE: {travel.bus?.bus_plate}</strong>
                <div className="buy-route">
                    <p>ORIGIN: {origin?.place?.place_name} - {travel.travel_origin?.stop_name} </p>
                </div>
                <div className="buy-route">
                    <p>DESTINY: {destiny?.place?.place_name} - {travel.travel_destiny?.stop_name}</p>
                </div>

<<<<<<< HEAD
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
=======
                <h2 className="buy-step">STEP 4 SELECT YOUR SEAT</h2>
                <div className="buy-bus">


>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2

                {sortedSeats.length === 0 ? (
                    <p>No seats found for this bus</p>
                ): (
                    <div className="buy-seats">

                        {sortedSeats.map((seatInfo: any) => {
                            const occupied = occupiedSeats.includes(seatInfo.id_seat);
                            const selected = selectedSeat?.id_seat === seatInfo.id_seat;
                            return (
                                <button
                                    type="button"
                                    key={seatInfo.id_seat}
                                    className={`buy-seat${selected ? ' is-selected' : ''}${occupied ? ' is-occupied' : ''}`}
                                    onClick={() => !occupied && setSelectedSeat(seatInfo)}
                                    disabled={occupied}
                                    aria-pressed={selected ? true : false}
                                >
                                    {seatInfo.seat_number}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
<<<<<<< HEAD
                <button type="submit">
=======
                <h2 className="buy-step">STEP 5 SELECT YOUR PAYMENT METHOD</h2>
                <div className="buy-pay">
                    {paymentTypes.map((type) => {
                        const method = String(type.name || '').toUpperCase();
                        const isActive = selectedPaymentTypes?.id_payment_type === type.id_payment_type;
                        return (
                            <button
                                key={type.id_payment_type}
                                type="button"
                                className={`buy-pay-btn${isActive ? ' is-active' : ''}`}
                                data-payment={method}
                                aria-pressed={isActive ? true : false}
                                onClick={() => setSelectedPaymentTypes(type)}
                            >
                                {type.name}
                            </button>
                        );
                    })}

                    {selectedPaymentTypes?.name === "QR" && (
                        <div className="buy-pay-detail" data-detail="QR">
                            <h3>SIMPLE QR</h3>

                            <p>INSTRUCTIONS</p>
                            <ul>
                                <li> Scan QR code until money bank app</li>
                                <li> Pay exact amount <strong>{travel.price}</strong></li>
                                <li> Insert the reference number/comprobant </li>
                            </ul> 
                            <label htmlFor="">Reference number or comprobant</label>
                            <input 
                                type="text" 
                                name="transaction_code"
                                placeholder="Ej: 123456648"
                                value={formData.transaction_code}
                                onChange={handleChange}
                                required={selectedPaymentTypes?.name === 'QR'}
                            />
                        </div>
                       
                    )}
                    {selectedPaymentTypes?.name === "CARD" && (
                        <div className="buy-pay-detail" data-detail="CARD">
                            <h3>CARD</h3>
                            <p>INSTRUCTIONS</p>
                            <ul>
                                <li> Put your data card (Mastercard, Visa or Takenos)</li>
                                <li> Pay exact amount <strong>{travel.price}</strong></li>
                            </ul> 
                        <div className="buy-card-grid">
                            <div className="buy-field">
                                <label>
                                    Card Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: Gabriel Andia"
                                    required={selectedPaymentTypes?.name === 'CARD'}/>
                            </div>
                            <div className="buy-field">
                                <label>
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    maxLength={19}
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    required={selectedPaymentTypes?.name === 'CARD'} />
                            </div>
                            <div className="buy-field">
                                <label>
                                    Expire Date
                                </label>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    required={selectedPaymentTypes?.name === 'CARD'}/>
                            </div>
                            <div className="buy-field">
                                <label>
                                    CVV
                                </label>
                                <input
                                    type="password"
                                    placeholder="123"
                                    maxLength={4}
                                    required={selectedPaymentTypes?.name === 'CARD'}/>
                            </div>
                        </div>

                        </div>
                    )}
                    {selectedPaymentTypes?.name === "PAYPAL" && (
                        <div className="buy-pay-detail" data-detail="PAYPAL">
                            <h3>PAYPAL</h3>
                            <p>INSTRUCTIONS</p>
                            <ul>
                                <li>Login with your PayPal account</li>
                            </ul>
                            <a href="https://www.paypal.com/bo/home" target="_blank" rel="noreferrer">
                                <button type="button">PAYPAL</button>
                            </a>
                        </div>
                    )}
                </div>
                <button className="buy-submit" type="submit">
>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2
                    BUY
                </button>
            </form>

<<<<<<< HEAD
           
        </>
=======
            </form>
        </div>
>>>>>>> f71c26581ed30c4fd83c89eb449233c07b0a2dd2
    )
}

export default BuyTicket;