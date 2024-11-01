import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Profile() {
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [techSkills, setTechSkills] = useState([]);
  const [degree, setDegree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const auth = Cookies.get('authToken'); 
      
      console.log(auth);
      
      try {
        const response = await axios.get("http://localhost:9000/user/profile", {
          headers:{
            Authorization: `Bearer ${auth}`
          },
          withCredentials: true
  
        });
        
        setUser(response.data.user); 
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Could not load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = Cookies.get('authToken'); 

    try {
      const response = await axios.post("http://localhost:9000/user/jobprofile", {
        location,
        aboutme: aboutMe,
        techskills: techSkills,
        degree,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating job profile:", error.response ? error.response.data : error.message);
      setError("An error occurred while creating your job profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-2">Create Job Profile</h2>
        {loading && <div className="text-center"><Spinner /></div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
 
        {user && (
          <div className="mb-4 text-center">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
          </div>
        )}

        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full p-2 border rounded"
              placeholder="Enter your location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="aboutMe">
              About Me
            </label>
            <textarea
              id="aboutMe"
              className="w-full p-2 border rounded"
              placeholder="Tell us about yourself"
              required
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="techSkills">
              Tech Skills
            </label>
            <input
              type="text"
              id="techSkills"
              className="w-full p-2 border rounded"
              placeholder="Enter your tech skills (comma separated)"
              required
              value={techSkills}
              onChange={(e) => setTechSkills(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="degree">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              className="w-full p-2 border rounded"
              placeholder="Enter your highest degree"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
