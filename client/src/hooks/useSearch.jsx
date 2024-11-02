import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function useSearch() {
  const [searchedValue, setSearchedValue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const token = Cookies.get("authToken");

    try {
      const response = await axios.post(
        "http://localhost:9000/jobs/jobopenings",
        { searchedValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setJobs(response.data.bodyJson);
      }
    } catch {
      setError("Error occurred! Could not find requested job.");
    } finally {
      setLoading(false);
    }
  }

  return {
    searchedValue,
    setSearchedValue,
    jobs,
    error,
    loading,
    handleSearch,
  };
}
