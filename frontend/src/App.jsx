import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminSignupPage from './pages/AdminSignupPage';
import FacultyDashboard from './pages/FacultyDashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path='/' element={<LandingPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/admin-signup' element={<AdminSignupPage/>} />
    <Route path='/admin' element={<ProtectedRoute role='admin'><AdminDashboard/></ProtectedRoute>} />
    <Route path='/faculty' element={<ProtectedRoute role='faculty'><FacultyDashboard/></ProtectedRoute>} />
  </Routes></BrowserRouter></AuthProvider>;
}
