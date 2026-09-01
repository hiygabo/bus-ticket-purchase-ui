import { createPassenger } from "../../../services/PassengerService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function ReservationForm () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name : '',
        ci: '',
        age: '',
        passengerId: '',
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
            const response = await createPassenger(payload);
            Swal.fire("Success", "Reservation created successfully", "success");
            navigate('/travel-search', {
                state: {
                    passengerId: response.id_passenger,
                    ci: payload.ci,
                    full_name: payload.full_name
                }
            })

        } catch (error){
            Swal.fire("Error", "Error to create reservation", "error");
            console.log("Error to create reservation: ", error)
        }
    }

    return(
        <>
            <h1>FIRST STEP</h1>
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