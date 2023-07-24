import { Navigate, useParams } from "react-router-dom"
import React, {useState } from 'react';
import ReactModal from 'react-modal';
import { useEffect } from "react";
import axios from "axios";




export default function userDrives() {
    
    const {id} =useParams()
    const [isOpen, setIsOpen] = useState(true);
    const [isClose, setIsClose] = useState(false);
    const [drive, setDrive] = useState(null)
    const [user, setUser] = useState(null)


    useEffect(() =>{
        if(!id){
            return;
        }
        else{
            axios.get(`/drives/${id}`).then(response=>{
                setDrive(response.data)
            })
            axios.get(`/profile`).then(response=>{
                setUser(response.data)
            })
        }
    }, [id])

    if(isClose){
        return <Navigate to={'/account/drives'} />
     }
     if(!drive){
        return;
     }
     
 return (
    <div>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsClose(true)}
      >
        <button onClick={()=>setIsClose(true)} className="bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="mainfont">
        <h1>Driver: {drive.fName} {drive.lName}</h1>
        <h1>Drive Date: {drive.date[5]}{drive.date[6]}/{drive.date[8]}{drive.date[9]}/{drive.date[0]}{drive.date[1]}{drive.date[2]}{drive.date[3]}</h1>
        <h1>Drive Time: {drive.time}</h1>
        <h1>Start Place: {drive.Scity}</h1>
        <a className="underline" target="_blank" href={'https://maps.google.com/?q='+drive.Sloc}>{drive.Sloc}</a>
        <h1>End Place: {drive.ECity}</h1>
        <a className="underline" target="_blank" href={'https://maps.google.com/?q='+drive.Eloc}>{drive.Eloc}</a>
        <h1>Cost: ${drive.cost}</h1>
        <h1>Seats Left: {drive.cap}</h1>
        <h1>Form of Payment Preferred: {drive.payType}</h1>
        <h1>Payment User Id (If Applicable): {drive.payID}</h1>
        <h1>Additional Information (from the Driver): {drive.addInfo}</h1>
        </div>
      </ReactModal>
    </div>
  );
}