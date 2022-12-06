import React, {useState} from "react";
import "./Login.css";

export default function Login(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
            <button type="submit" className="btn btn-block btn-primary">Login</button>
        </form>
    </div>
        )
    }