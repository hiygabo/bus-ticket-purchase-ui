import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import "./Login.css";

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
            window.dispatchEvent(new Event('auth-changed'));
            navigate('/admin');

        }catch(error){
            setError('Wrong Email or Password, try again');
            console.error(error);
        }
    };

    return (
        <>
            <h1>Admin Login</h1>
            {error && <p className="login__error" role="alert">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="login_email">Email</label>
                    <input id="login_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="login_password">Password</label>
                    <input id="login_password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </>
    );
}
export default Login;