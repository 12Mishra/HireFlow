import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import LoginPageUser from "./pages/user/Login_user";
import SignupPageUser from "./pages/user/Signup_user";
import LoginPageRecruiter from "./pages/recruiter/Login_Recruiter";
import SignupPageRecruiter from "./pages/recruiter/Signup_Recruiter";
import Profile from "./pages/user/Profile";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/auth/signup' element={<SignupPageUser />} />
        <Route path='/user/auth/login' element={<LoginPageUser />} />
        <Route path='/user/jobprofile' element={<Profile />} />
        <Route path='/recruiter/auth/signup' element={<SignupPageRecruiter />} />
        <Route path='/recruiter/auth/login' element={<LoginPageRecruiter />} />
      </Routes>
    </>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
      <Footer />
    </>
  );
}
