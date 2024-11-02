import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import HeroSection from "./components/Home/HeroSection";
import Features from "./components/Home/Features";
import Footer from "./components/Home/Footer";
import LoginPageUser from "./pages/user/Login_user";
import SignupPageUser from "./pages/user/Signup_user";
import LoginPageRecruiter from "./pages/recruiter/Login_Recruiter";
import SignupPageRecruiter from "./pages/recruiter/Signup_Recruiter";
import Profile from "./pages/user/JobProfile";
import PostJob from "./pages/recruiter/PostaJob";
import JobOpenings from "./pages/user/JobOpenings";
import JobListing from './pages/user/JobListing';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/auth/signup' element={<SignupPageUser />} />
        <Route path='/user/auth/login' element={<LoginPageUser />} />
        <Route path='/user/jobprofile' element={<Profile />} />
        <Route path='/user/jobopenings' element={<JobOpenings />} />
        <Route path='/user/jobs/:id' element={<JobListing />} />
        <Route path='/recruiter/auth/signup' element={<SignupPageRecruiter />} />
        <Route path='/recruiter/auth/login' element={<LoginPageRecruiter />} />
        <Route path='/jobs/addjob' element={<PostJob />} />
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
