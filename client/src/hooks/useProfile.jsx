import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useProfile = () => {
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [techSkills, setTechSkills] = useState([]);
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const auth = Cookies.get("authToken");

      try {
        const response = await axios.get("http://localhost:9000/user/profile", {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
          withCredentials: true,
        });

        setUser(response.data.user);
        setLocation(response.data.user.location || "");
        setAboutMe(response.data.user.aboutMe || "");
        setTechSkills(response.data.user.techSkills || []);
        setDegree(response.data.user.degree || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Could not load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = Cookies.get("authToken");

    try {
      const response = await axios.post(
        "http://localhost:9000/user/jobprofile",
        {
          location,
          aboutme: aboutMe,
          techskills: techSkills,
          degree,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating job profile:", error);
      setError("An error occurred while creating your job profile.");
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    setLocation,
    aboutMe,
    setAboutMe,
    techSkills,
    setTechSkills,
    degree,
    setDegree,
    loading,
    error,
    user,
    handleProfileSubmit,
  };
};

export default useProfile;
