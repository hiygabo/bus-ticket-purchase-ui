import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
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
import Login from './pages/auth/Login';

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!localStorage.getItem('admin_token')) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

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
        <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}/>
        <Route path="/travel-list" element={<ProtectedRoute><TravelList/></ProtectedRoute>}/>
        <Route path="/buses-list" element={<ProtectedRoute><BusList/></ProtectedRoute>}/>
        <Route path="/edit-bus/:id" element={<ProtectedRoute><EditBus/></ProtectedRoute>}/>
        <Route path="/edit-travel/:id" element={<ProtectedRoute><EditTravel/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;