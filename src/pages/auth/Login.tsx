import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";

function Login(){
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try{
            const data = await login(email, password);
            localStorage.setItem('admin_token', data.access_token);
            navigate('/admin');

        }catch(error){
            setError('Wrong Email or Password, try again');
            console.error(error);
        }
    };

    return (
        <>
            <p>{error}</p>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">
                    LOGIN
                </button>
            </form>
        </>
    );
}
export default Login;