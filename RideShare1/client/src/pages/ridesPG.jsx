import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AccNavBar from "../accNavBar";

export default function RidePage(){
    const [ride, setRide] = useState([]);
    const [drive, setDrive] = useState(null);
    const [count, setCount] = useState(1)
    const [dinfo, setDinfo] = useState(null);



    useEffect(()=>{
        axios.get('/rides').then(response =>{
            setRide(response.data)
        })
    }, []);

    useEffect(()=>{
        axios.get('/drives'+ride.newdriveID).then(response =>{
            setDinfo(response.data)
        })
    }, []);




    if(drive){
        return <Navigate to={`/account/rides/${drive}`}/> 
    }

    return(
        <div className="mainfont">
            <AccNavBar/>
            <div className="text-center mt-4">
            My Ride Reservations:
            </div>
           <div className="mt-4 gap-2 grid grid-cols-6 flex mainfont">
                {ride?.length >= 0 && ride.map((ride, index)=>(
                    <button onClick={()=> {setDrive(ride.newdriveID); setCount(count+1)}} className="minibox">
                            <div className="underline" key={index}> Rides # {index+1} </div> 
                    </button>
                ))}
           </div>
        </div>
    );
}