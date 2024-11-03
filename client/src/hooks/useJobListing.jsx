//for all jobs to be listed

import {useState , useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function useJobListing() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userCookie = Cookies.get("authToken");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/jobs/jobopenings",
          {
            headers: {
              Authorization: `Bearer ${userCookie}`,
            },
          }
        );

        setJobs(response.data.jobs);
      } catch (error) {
        setError("Failed to load job openings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userCookie]);


  return {jobs, loading, error};
}
