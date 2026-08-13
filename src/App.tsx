import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/user/welcomePage';
import ReservationForm from './pages/user/reservationForm';
import TravelSearchForm from './pages/user/TravelSearchForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reservation" element={<ReservationForm/>}></Route>
        <Route path="/travel-search" element={<TravelSearchForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;