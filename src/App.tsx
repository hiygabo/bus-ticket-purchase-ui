import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/user/WelcomePage';
import ReservationForm from './pages/user/Booking/ReservationForm';
import TravelSearchForm from './pages/user/Booking/TravelSearchForm';
import BuyTicket from './pages/user/Booking/BuyTicket';
import TravelList from './pages/admin/Travel/TravelsList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reservation" element={<ReservationForm/>}></Route>
        <Route path="/travel-search" element={<TravelSearchForm/>}/>
        <Route path="/buy-ticket" element={<BuyTicket/>}/>
        <Route path="/travel-list" element={<TravelList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;