import React, {useState} from "react";
import axios from "axios";
import {variables} from "./Variables";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login(props){
    const [UserName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        login(UserName, password);
    }

    async function login(name, pasw){
        axios.post(variables.API_URL + 'login', {
            userName: name,
            password: pasw
        }).then((response) => {
            if (response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data.accessToken));
                props.loggedState(true);
                navigate('/');
            }
        }).catch(error => alert(error.response.data));
    }
    
    return(
    <div className="Login">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="UserName">Username</label>
                <input type="text" className="form-control" id="UserName" required 
                value={UserName} 
                onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input type="password" className="form-control" id="Password" required
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-block btn-primary">Login</button>
        </form>
    </div>
        )
    }