import { createUser } from "../../services/UserService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaces } from "../../services/PlaceService";
import Swal from "sweetalert2";
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
        <form onSubmit={handleSignUp}>
            <label>YOUR NAME: </label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required/>

            <label>YOUR EMAIL</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label> YOUR PASSWORD </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <label> YOUR CITY </label>
            <select name="id_place" value={formData.id_place} onChange={handleChange} required>
                <option value="" disabled>Select your city...</option>
                {Array.isArray(places) && places.map((place) => (
                    <option key={place.id_place} value={place.id_place}>
                        {place.place_name}
                    </option>
                ))}
            </select>

            <button type="submit">
                CREATE ACCOUNT
            </button>
        </form>
        
    </>
);
}



export default SignUp;