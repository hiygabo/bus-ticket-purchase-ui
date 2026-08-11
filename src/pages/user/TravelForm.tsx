import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStops } from "../../services/stopService";
import { getTravels } from "../../services/travelService";

function TravelSearchForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const { passengerId, ci, age } = location.state || {};

    const [stops, setStops] = useState<any[]>([]);
    const [availableTravels, setAvailableTrabels] = useState<any[]>([]);
    const [searchData, setSearchData] = useState({
        id_origin_stop: '',
        id_destiny_stop: '',
        deaperture_date: ''
    });

    useEffect(() => {
        const fetchStops = async () => {
            try{
                const data = await getStops();
                setStops(data);
            }catch (error) {
                console.error("Error fetching stops", error);
            }
        };
        fetchStops();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
        setSearchData({...searchData, [e.target.name]: e.target.value});
    }

    
}