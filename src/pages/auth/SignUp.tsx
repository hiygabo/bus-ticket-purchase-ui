import { createUser } from "../../services/UserService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaces } from "../../services/PlaceService";
import Swal from "sweetalert2";
import "./SignUp.css";
function SignUp (){

    const [formData, setFormData] = useState({
        full_name : '',
        email: '',
        password: '',
        id_place: ''
    });

    const [ places, setPlaces ] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPlaces= async () => {
            try{
                const data = await getPlaces();
                if(Array.isArray(data)){
                    setPlaces(data);
                }else if (data && Array.isArray(data.data)){
                    setPlaces(data.data)
                }else {
                    setPlaces([]);
                }
            }catch(error){
                console.error("Error fetching places", error);
            }
        } 
        fetchPlaces();
    }, [])

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            full_name : formData.full_name,
            email: formData.email,
            password: formData.password,
            id_place: Number(formData.id_place)
        }

        try{
            await createUser(payload);
            Swal.fire("Success", "Account created successfully, please return to Log in", "success");
            navigate('/login');

        }catch (error) {
            Swal.fire("Error", "Error to create account", "error");
            console.error("Error to create account", error);
        }
    } 


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return(
    <>
        <h1>SIGN UP</h1>
        <form id="signup_form" onSubmit={handleSignUp}>
            <div>
                <label htmlFor="signup_name">YOUR NAME</label>
                <input id="signup_name" type="text" name="full_name" value={formData.full_name} onChange={handleChange} required/>
            </div>

            <div>
                <label htmlFor="signup_email">YOUR EMAIL</label>
                <input id="signup_email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="signup_password">YOUR PASSWORD</label>
                <input id="signup_password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="signup_city">YOUR CITY</label>
                <select id="signup_city" name="id_place" value={formData.id_place} onChange={handleChange} required>
                    <option value="" disabled>Select your city...</option>
                    {Array.isArray(places) && places.map((place) => (
                        <option key={place.id_place} value={place.id_place}>
                            {place.place_name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">
                CREATE ACCOUNT
            </button>
        </form>
        
    </>
);
}



export default SignUp;