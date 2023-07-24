import axios from "axios";
import { useState } from "react";
import { useContext } from "react"
import { Navigate } from "react-router-dom";
import AccNavBar from "../accNavBar";
import { UserContext } from "../UserContext"

export default function AccountPage(){
    const[home, setHome] = useState(null);


    const {ready, user, setUser} = useContext(UserContext);

    async function logout(){
        await axios.post('/logout');
        setHome('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }

    if(!user && ready && !home){
        return <Navigate to={'/login'} />
    }

    if(home){
        return <Navigate to={home} />
    }
    return(
        <div>
            <AccNavBar/>

                <div className="text-center max-w-lg mx-auto mainfont mt-4">
                    Logged in as {user.fName} {user.lName} ({user.email})<br/>
                    <button onClick={logout} className="primary mt-2">
                        Logout
                    </button>
                </div>
        
            
        </div>
    );
}