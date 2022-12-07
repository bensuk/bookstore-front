import axios from "axios";
import React, {useState} from "react";
import {variables} from "./Variables";
import "./Login.css";

export default function SignUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedSuccessfully, setSignedSuccessfully] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        SignUp(username, email, password);
    }

    function SignUp(name, email, pasw){
        axios.post(variables.API_URL + 'register', {
            userName: name,
            email: email,
            password: pasw
        }).then(response => {
            if (response.status === 201){
                setSignedSuccessfully(true);
            }
        }).catch(error => {
            alert(error.response.data);
        })
    }
    
    return(
    <div className="Login">
        
        {signedSuccessfully && (
            <div className="alert alert-success" role="alert">
                Signed up successfully
            </div>)}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="UserName">Username</label>
                <input type="text" className="form-control" id="UserName" required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input type="email" className="form-control" id="Email" required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input type="password" className="form-control" id="Password" required
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-block btn-primary">Sign up</button>
        </form>
    </div>
        )
    }