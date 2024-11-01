import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignupPageRecruiter() {
  const [rname, setRName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    setError(""); 
    setSuccess(""); 

    try {
      const response = await axios.post("http://localhost:9000/recruiter/auth/signup", {
        recruitername: rname,
        company,
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError("Error occurred! Please check your credentials.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Signup as a Recruiter</h2>
        <span className='text-sm flex items-center justify-center mx-2'>Already have an account? <Link to='/recruiter/auth/login'>Login</Link></span>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Recruiter Name
            </label>
            <input
              type="text"
              id="recruitername"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={rname}
              onChange={(e) => setRName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="w-full p-2 border rounded"
              placeholder="Enter your Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Company Email
            </label>
            <input
              type="email"
              id="companyemail"
              className="w-full p-2 border rounded"
              placeholder="Enter your Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Signup
          </button>
        
        </form>
      </div>
    </div>
  );
}
