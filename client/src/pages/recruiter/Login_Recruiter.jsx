import React from 'react';
import { Link } from 'react-router-dom';
import { useRecruiterAuth } from '../../hooks/useAuth';

export default function LoginPageRecruiter() {
  const { emailRecruiter, setEmailRecruiter, passwordRecruiter, setPasswordRecruiter, success, error, handleLoginRecruiter } = useRecruiterAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login as a Recruiter</h2>
        <span className='text-sm flex items-center justify-center'>Don't have an account? <Link to='/recruiter/auth/signup' className="text-blue-500 hover:underline font-semibold">Get Started</Link></span>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        
        <form onSubmit={handleLoginRecruiter}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="companyemail">
              Company Email
            </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
