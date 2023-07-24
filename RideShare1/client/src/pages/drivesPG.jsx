import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AccNavBar from "../accNavBar";


export default function DrivesPage(){

    const[drive, setDrive] = useState([]);

    useEffect(()=>{
        axios.get('/drives').then(({data})=>{
            setDrive(data);
        });
    }, []);




    return(
        <div>
            <AccNavBar/>
        <div className="text-center mainfont mt-4">
            <Link className="border text-center gap-1 inline-flex mt-4" to={'/account/drives/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add New Drive
            </Link>
        <div className="mt-4 grid grid-cols-4 flex">
            {drive.length>0 && drive.map(drive=>(
                <div>
                    <Link to = {"/account/drives/info/"+drive._id} className="box mainfont">
                    {drive.Scity} to {drive.ECity}
                    <br/>
                    Date: {drive.date[5]}{drive.date[6]}/{drive.date[8]}{drive.date[9]}/{drive.date[0]}{drive.date[1]}{drive.date[2]}{drive.date[3]}
                    <br/>
                    Time: {drive.time}
                    <br/>
                    Seats Left: {drive.cap}
                    <br/>
                    </Link>
                    <div className="flex mt-0 px-20 mainfont">
                        <Link to = {"/account/drives/"+drive._id}>Edit</Link>
                    </div>
                </div>
                
            ))}

        </div>
            </div>
        </div>
    )}