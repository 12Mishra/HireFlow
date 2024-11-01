import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function PostJob() {
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Post a Job</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handlePostJob}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              className="w-full p-2 border rounded"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              className="w-full p-2 border rounded"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              className="w-full p-2 border rounded"
              placeholder="Enter job location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Type</label>
            <select
              id="jobType"
              className="w-full p-2 border rounded"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Salary</label>
            <input
              type="text"
              id="salary"
              className="w-full p-2 border rounded"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Description</label>
            <textarea
              id="description"
              className="w-full p-2 border rounded"
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
