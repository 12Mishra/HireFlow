import React from 'react';
import { Link } from 'react-router-dom';
import { useRecruiterAuth } from '../../hooks/useAuth';

export default function SignupPageRecruiter() {
  const { rname, setRName, emailRecruiter, setEmailRecruiter, company, setCompany, passwordRecruiter, setPasswordRecruiter, error, success, handleSignupRecruiter } = useRecruiterAuth();

  const handleSubmit = (e) => {
    handleSignupRecruiter(e); // Pass the event directly here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Signup as a Recruiter</h2>
        <span className='text-sm flex items-center justify-center mx-2'>Already have an account? <Link to='/recruiter/auth/login'>Login</Link></span>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recruiter Name</label>
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
            <label className="block text-gray-700 mb-2">Company Name</label>
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
            <label className="block text-gray-700 mb-2">Company Email</label>
            <input
              type="email"
              id="companyemail"
              className="w-full p-2 border rounded"
              placeholder="Enter your Company Email"
              value={emailRecruiter}
              onChange={(e) => setEmailRecruiter(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              value={passwordRecruiter}
              onChange={(e) => setPasswordRecruiter(e.target.value)}
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
