import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreateEvent from "./Pages/Admindashboard/CreateEvent";
import HomePage from "./Pages/Admindashboard/HomePage";
import EventPage from "./Pages/Admindashboard/EventPage";
import RegisterTicket from "./Pages/RegisterTicket";
import RegisteredUsersTable from "./Pages/Admindashboard/RegisteredUsersTable";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/adminEvent-page" element={<EventPage/>}/>
        <Route path="/adminCreate-event" element={<CreateEvent/>}/>
        <Route path="/adminHome-page" element={<HomePage/>}/>
        <Route path="/register-ticket" element={<RegisterTicket/>}/>
        <Route path="/adminRegistration-table" element={<RegisteredUsersTable/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App