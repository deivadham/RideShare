import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Navigate } from "react-router-dom";


export default function Booking({Pdrive, user}){
    const[seat, setSeats] = useState(1);
    const[redirect, setRedirect] = useState('');
    const[ride, setRide] = useState([])
   

    if(!user){
        return <Navigate to={'/login'}/>
    }


    async function reserve(){
        await axios.post('/rides', {
            driveID: Pdrive._id, fName:user.fName, lName:user.lName, seat: seat, email:user.email, newdriveID:Pdrive._id,
        });
        alert('Successfully Booked');
        setRedirect(`/account/rides/${Pdrive._id}`)
    }
    
    useEffect(()=>{
        axios.get('/rides').then(response =>{
            setRide(response.data)
        })
    }, []);

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
        {Pdrive.cap>0 ? (
          <button className="mainfont button mt-4 primary" onClick={reserve}>
            Book Now
         </button>
        ) : (
          <div>No more seats</div>
        )}
  </div>
)}
