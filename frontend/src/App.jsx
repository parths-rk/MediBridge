import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointments";
import MyAppointments from "./pages/MyAppointments";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";


export default function App() {
  return (
    <AuthProvider>
      
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      
    </AuthProvider>
  );
}
