import React, {useState} from "react";
import "./Login.css";

export default function Login(){
    const [UserName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();
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