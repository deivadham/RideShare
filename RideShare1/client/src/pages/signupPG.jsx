import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage(){
    const[fName,setfName] = useState('');
    const[lName,setlName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    async function SignupUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/signup', {
                fName,
                lName,
                email,
                password,
            });
            alert('Successfully Sign Up. Please Log In');
        }
        catch(e){
            alert('Sign Up Failed. Try Again Later');
        }
    }


    return(
        <div className="mt-8 grow flex items-center justify-around mainfont">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Sign Up</h1>
            <form className="max-w-2xl mx-auto mt-4" onSubmit={SignupUser}>
                <input type="fName" placeholder="Enter First Name" value={fName} onChange={ev=> setfName(ev.target.value)}/>
                <input type="lName" placeholder="Enter Last Name" value={lName} onChange={ev=> setlName(ev.target.value)}/>
                <input type="email" placeholder="Enter Email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
                <input type="password" placeholder="Enter Password" value={password} onChange={ev=> setPassword(ev.target.value)}/>
                <button className="primary border mt-6">Sign Up</button>
                <div className="text-center py-2  mt-2">To Login   
                    <Link className="underline px-2" to={'/login'}>Click Here</Link>
                </div>
            </form>

            </div>
        </div>
    );
};