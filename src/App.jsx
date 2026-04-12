import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal import
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/auth/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/public/Home";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Errors from './pages/errors/Errors';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Errors />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
