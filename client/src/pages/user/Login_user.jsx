import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../hooks/useAuth';

export default function LoginPageUser() {
  const { email, setEmail, password, setPassword, success, error, handleLoginUser } = useUserAuth();
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-2">Login as an Applicant</h2>
        <span className='text-sm flex items-center justify-center ml-2'>
          Don't have an account? <Link to='/user/auth/signup'> Get Started</Link>
        </span>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleLoginUser}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
