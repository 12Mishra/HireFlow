import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function useAddJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handlePostJob(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const auth = Cookies.get("authRecruiterToken");

    try {
      const response = await axios.post(
        "http://localhost:9000/jobs/addjob",
        {
          jobTitle,
          companyName,
          location,
          jobType,
          salary,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccess("Job posted successfully! Redirecting...");
        setTimeout(() => {
          navigate("/my-job-postings");
        }, 2000);
      }
    } catch (error) {
      setError("Failed to post the job! Please check your details.");
    }
  }
  return (
    jobTitle,
    setJobTitle,
    companyName,
    setCompanyName,
    location,
    setLocation,
    jobType,
    setJobType,
    salary,
    setSalary,
    description,
    setDescription,
    error,
    success,
    handlePostJob
  );
}
