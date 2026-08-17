import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/user/WelcomePage';
import ReservationForm from './pages/user/booking/ReservationForm';
import TravelSearchForm from './pages/user/booking/TravelSearchForm';
import BuyTicket from './pages/user/booking/BuyTicket';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reservation" element={<ReservationForm/>}></Route>
        <Route path="/travel-search" element={<TravelSearchForm/>}/>
        <Route path="/buy-ticket" element={<BuyTicket/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;