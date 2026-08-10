import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/user/welcomePage';
import ReservationForm from './pages/user/reservationForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reservation" element={<ReservationForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;