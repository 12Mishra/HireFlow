import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function useSearch() {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  async function handleSearch(e) {
    
    e.preventDefault();
    setSearchLoading(true);
    setSearchError("");
    
    const token = Cookies.get("authToken");

    try {
      const response = await axios.post(
        "http://localhost:9000/jobs/jobopenings",
        { searchedValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSearchedJobs(response.data.bodyJson);
      }
    } catch {
      setSearchError("Error occurred! Could not find requested job.");
    } finally {
      setSearchLoading(false);
    }
  }

  return {
    searchedValue,
    setSearchedValue,
    searchedJobs,
    searchError,
    searchLoading,
    handleSearch,
  };
}
