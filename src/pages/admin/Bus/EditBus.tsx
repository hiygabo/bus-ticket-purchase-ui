import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editBus } from "../../../services/BusService";
import { getCategories } from "../../../services/CategoryService";

function EditBus(){
    const location = useLocation();
    const navigate = useNavigate();
    const busInfo = location.state?.busInfo;

    const [busPlate, setBusPlate] = useState(busInfo?.bus_plate || "");
    const [busState, setBusState] = useState(busInfo?.bus_state || "ACTIVE");
    const [categories, setCategories] = useState<any[]>([]);
    const [categoryId, setCategoryId] = useState(busInfo?.category?.id_category || "");

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const data = await getCategories();
                if(Array.isArray(data)){
                    setCategories(data);
                }else if (data && Array.isArray(data.data)){
                    setCategories(data.data);
                }else{
                    console.warn(data);
                    setCategories([]);
                }
            }catch (error){
                console.error("Error fetching categories", error);
                setCategories([]);
            }
        }
        fetchCategories();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            bus_plate:  busPlate,
            bus_state:  busState,
            categoryId: Number(categoryId)
        };

        try{
            await editBus(busInfo.id_bus, payload);
            alert("Bus edited succesfully");
            navigate("/buses-list")
        }catch(error){
            console.error(error)
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Edit bus {busInfo.id_bus}</h2>
            <div>
                <label>Bus Plate</label>
                <input type="text" value={busPlate} onChange={(e) => setBusPlate(e.target.value)} required />
            </div>
            <div>
                <label>Status</label>
                <select value={busState} onChange={(e) => setBusState(e.target.value)}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
                
            </div>

            <div>
                <label> Category </label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="" disabled> Select a category...</option>
                    {Array.isArray(categories) && categories.map((category) => (
                        <option key={category.id_category} value={category.id_category}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">
                    SAVE CHANGES
                </button>
            </form>
            <button className="back-btn" onClick={() => navigate("/admin")}>
                ← Back
            </button>
        </>
    )
}
export default EditBus;