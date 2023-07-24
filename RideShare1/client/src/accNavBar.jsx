import { Link } from "react-router-dom";


export default function AccNavBar(){
    function linkClass (type=null){
        let classes = 'p-2 px-4 border-full';
        if(type===false){
            classes+= 'bg-primary border';
        }
        return classes;
    }

    return(
    <nav className="w-full flex mt-4 gap-2 justify-center mt-8 gap-4 mainfont border border-black">
        <Link className={linkClass('profile')} to={'/account'}>Profile</Link>
        <Link className={linkClass('rides')} to={'/account/rides'} subpage='Rides'>Car Rider</Link>
        <Link className={linkClass('drives')} to={'/account/drives'} subpage='Drives'>Car Driver</Link> 
        <Link to={'/'} className="flex gap-4 py-2 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                Return Home
        </Link>
    </nav>
    );
}