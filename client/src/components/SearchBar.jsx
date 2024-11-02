import { Search } from "lucide-react";
import Loader from "../components/common/Loader.jsx";
import useSearch from "../hooks/useSearch.jsx";

export default function SearchBar() {
  const { searchedValue, setSearchedValue, jobs, error, loading, handleSearch } = useSearch();

  return (
    <>
      <form
        className="flex items-center mt-4 ml-4 mr-4 border rounded-lg w-1/4 mb-8"
        onSubmit={handleSearch}
      >
        <Search className="text-gray-400 ml-3" size={20} />
        <input
          type="text"
          placeholder="Search jobs"
          className="w-full p-3 focus:outline-none text-gray-700 ml-2"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Go
        </button>
      </form>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job._id}
            className="border shadow-lg h-[400px] flex flex-col"
          >
          </Card>
        ))}
      </div>
    </>
  );
}
