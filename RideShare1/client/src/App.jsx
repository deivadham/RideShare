import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AccountPage from './pages/accountPG'
import DrivesPage from './pages/drivesPG'
import IndexPage from './pages/indexPG'
import LoginPage from './pages/loginPG'
import SignupPage from './pages/signupPG'
import DriveForm from './pages/driveNewPG'
import { UserContextProvider } from './UserContext'
import DriveDesc from './pages/driveDesc'
import RidePage from './pages/ridesPG'
import UserRides from './pages/userRidesPG'
import UserDrives from './pages/userDrivesPG'

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={< LoginPage/>}/>
      <Route path="/signup" element={< SignupPage/>}/>
      <Route path="/account" element={< AccountPage/>}/>
      <Route path="/account/drives" element={< DrivesPage/>}/>
      <Route path="/account/drives/new" element={< DriveForm/>}/>
     <Route path="/account/drives/:id" element={< DriveForm/>}/>
     <Route path="/drives/:id" element={< DriveDesc/>}/>
     <Route path="/account/rides" element={< RidePage/>}/>
     <Route path="/account/rides/:id" element={< UserRides/>}/>
     <Route path="/account/drives/info/:id" element={< UserDrives/>}/>
    </Routes>
    </UserContextProvider>
  )
}

export default App
