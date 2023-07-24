import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);
   const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        }
        catch(e){
            alert('Login Failed');
        }
    }

    if(redirect){
        return <Navigate to= {'/'} />
    }

    return(
        <div className="mt-10 grow flex items-center justify-around mainfont">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-2xl mx-auto mainfont" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Enter Email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
                <input type="password" placeholder="Enter Password" value={password} onChange={ev=> setPassword(ev.target.value)}/>
                <button className="mt-4 primary">Login</button>
                <div className="text-center py-2 gap-4 ">To Sign Up     
                    <Link className="underline gap-4 px-2" to={'/signup'}>Click Here</Link>
                </div>
            </form>

            </div>
        </div>
    );
};