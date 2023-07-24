import { useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function DriveForm(){
    const {id} = useParams();

    const[Scity, setScity] = useState('');
    const[ECity, setEcity] = useState('');
    const[Eloc, setEloc] = useState('');
    const[Sloc, setSloc] = useState('');
    const[date, setDate] = useState(new Date("2022-03-25"));
    const[time, setTime] = useState('');
    const[cap, setCap] = useState(0);
    const[cost, setCost] = useState(0);
    const[payType, setpayType] = useState('');
    const[payID, setPayID] = useState('');
    const[addInfo, setaddInfo] = useState('');
    const [redirect,setRedirect] = useState(false);

 useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('/drives/'+id).then(response=>{
            const {data} = response;
            setScity(data.Scity);
            setEcity(data.ECity);
            setEloc(data.Eloc);
            setSloc(data.Sloc);
            setDate(data.date);
            setTime(data.time);
            setCap(data.cap);
            setCost(data.cost);
            setpayType(data.payType);
            setPayID(data.payID);
            setaddInfo(data.addInfo);      
        })
    }, [id])

    async function addDrive(ev){
        ev.preventDefault();
        if(id){
            await axios.put('/drives', {id, Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo});
        }
        else{
       await axios.post('/drives', {Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo});}
       setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/drives'} />
    }

    return(
        <div className="mainfont mt-4">
            <div className="text-center font-bold text-2xl">
                New Drive Form
            </div>
            <p className="text-center font-bold">Fill in Detail if you are willing to drive fellow students!</p>
            <form onSubmit={addDrive}>
            <h2 className="px-10">Start Location</h2>
            <input type="text" value={Scity} onChange={ev => setScity(ev.target.value)} placeholder="Enter City (Davis, Berkley, etc.)"/>
            <input type="text" value={Sloc} onChange={ev => setSloc(ev.target.value)}placeholder="Exact Location (760 Orchard Road, Davis, CA 95616)"/>
            <h2 className="px-10">End Location</h2>
            <input type="text" value={ECity} onChange={ev => setEcity(ev.target.value)} placeholder="Enter City (Davis, Berkley, etc.)"/>
            <input type="text" value={Eloc} onChange={ev => setEloc(ev.target.value)} placeholder="Exact Location (1750 Sacramento St, Berkeley, CA 94702)"/>
            <h2 className="px-10">Date of Travel</h2>
            <input className="px-20" type= "date" value={date} onChange={ev => setDate(ev.target.value)} />
            <h2 className="px-10 mt-4 flex">Time of Travel</h2>
            <input type="text" value={time} onChange={ev => setTime(ev.target.value)}/>
            <h2 className="px-10">Number of people you would like to drive</h2>
            <input className="px-20 flex" type="number" min="0" max="100" value={cap} onChange={ev => setCap(ev.target.value)} placeholder="Enter time including AM/PM"/>
            <h2 className="px-10 mt-4 flex">Cost Per Person</h2>
            <input className="px-20 flex" type="number" min="0" max="100" value={cost} onChange={ev => setCost(ev.target.value)}/>
            <h2 className="px-10 mt-4 flex">Payment Preference</h2>
            <input type="text" value={payType} onChange={ev => setpayType(ev.target.value)} placeholder="Payment Preferences: Venmo, Zelle, Cash In Person"/>
            <input type="text" value={payID} onChange={ev => setPayID(ev.target.value)} placeholder="If applicable add payment type ID: Venmo-ID"/>
            <h2 className="px-10 mt-4 flex">Additional Info</h2>
            <input type="text" value={addInfo} onChange={ev => setaddInfo(ev.target.value)} placeholder="Extra information you would like to add (flexibility in drop-off/pick-up locations, car rules, etc.)"/>
            <button className="primary mt- post">Post</button>
        </form>
    </div>
    );
}