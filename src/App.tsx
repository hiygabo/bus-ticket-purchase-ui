import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomePage from './pages/user/WelcomePage';
import ReservationForm from './pages/user/Booking/ReservationForm';
import TravelSearchForm from './pages/user/Booking/TravelSearchForm';
import BuyTicket from './pages/user/Booking/BuyTicket';
import TravelList from './pages/admin/Travel/TravelsList';
import BusList from './pages/admin/Bus/BusList';
import EditBus from './pages/admin/Bus/EditBus';
import EditTravel from './pages/admin/Travel/EditTravel';
import AdminPanel from './pages/admin/AdminPanel';
import AboutUs from './pages/user/AboutUs';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reservation" element={<ReservationForm/>}></Route>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/travel-search" element={<TravelSearchForm/>}/>
        <Route path="/buy-ticket" element={<BuyTicket/>}/>
        <Route path="/admin" element={<AdminPanel/>}/>
        <Route path="/travel-list" element={<TravelList/>}/>
        <Route path="/buses-list" element={<BusList/>}/>
        <Route path="/edit-bus/:id" element={<EditBus/>}/>
        <Route path="/edit-travel/:id" element={<EditTravel/>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;