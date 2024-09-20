import { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

function Form({ route, method, setShouldRefetch }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const methodName = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setShouldRefetch(prev => !prev);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">{methodName}</h1>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit" disabled={loading}>
                    {methodName}
                </button>
            </form>
        </div>
    );
}

export default Form;
