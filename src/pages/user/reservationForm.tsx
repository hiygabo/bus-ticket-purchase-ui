import { createTravel } from "../../services/travelService";
import { createPassenger } from "../../services/passengerService";
import { useState } from "react";

function ReservationForm () {
    const [formData, setFormData] = useState({
        full_name : '',
        ci: '',
        age: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const payload = {
            full_name: formData.full_name,
            ci: parseInt(formData.ci, 10),
            age: parseInt(formData.age, 10)
        }
        try{
            await createPassenger(payload);
            alert("Reservation created successfully")
        } catch (error){
            alert("Error to create reservation");
            console.log("Error to create reservation: ", error)
        }
    }

    return(
        <>
            <h1>BUY YOUR TICKET</h1>
            <h2> COMPLETE YOUR PERSONAL DATA</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="full_name">FULL NAME</label>
                    <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="ci">CI</label>
                    <input type="number" id="ci" name="ci" value={formData.ci} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="age">AGE</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required/>
                </div>
                <button type="submit">NEXT</button>
            </form>
        </>
    )



}

export default ReservationForm;