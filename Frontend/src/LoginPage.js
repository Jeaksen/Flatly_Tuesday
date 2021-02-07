import React, { useEffect, useState } from "react";
import "./BasicInputField.css"

export default function LoginPage(props)
{   
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <input className="BasicInputField" 
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
            />
            <input className="BasicInputField" 
                placeholder="Password"
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => {console.log('Login Button Clicked');}}>
                Login
            </button>
        </div>
    )
}