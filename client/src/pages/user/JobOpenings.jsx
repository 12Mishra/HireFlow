import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import companyLogo from "../../assets/companyLogo.png";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../../components/common/Loader";
import useSearch from "../../hooks/useSearch";
import { useJobListing } from "../../hooks/useJobListing";

export default function JobOpenings() {
  const {
    searchedJobs,
    loading,
    error,
    searchedValue,
    setSearchedValue,
    handleSearch,
  } = useSearch();

  const { jobs } = useJobListing();

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="text-red-500 text-center p-4 font-medium rounded-lg bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Currently Available Job Openings
      </h1>
      <form className="mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search jobs"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
          className="p-2 border rounded w-full"
          aria-label="Job search input"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </form>
      {jobs.length === 0 && (
        <p className="text-center text-gray-600">No jobs found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job._id}
            className="border shadow-lg h-[400px] flex flex-col"
          >
            <CardHeader className="flex gap-3 items-center p-4 bg-gray-50">
              <Image
                alt="Company Logo"
                height={40}
                radius="sm"
                src={companyLogo}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-gray-800 line-clamp-1">
                  {job.jobTitle}
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {job.companyName}
                </p>
                <p>No of applications: ({job.applicationCount})</p>
              </div>
            </CardHeader>

            <Divider />

            <CardBody className="p-4 flex-grow overflow-auto">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {job.description}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Location:
                    </span>
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Job Type:
                    </span>
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {job.jobType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Salary:
                    </span>
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-2">
                  <p className="font-semibold text-gray-800">Posted By:</p>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700">
                      <strong>Name:</strong> {job.createdBy.recruitername}
                    </span>
                    <span className="text-sm text-gray-700">
                      <strong>Company:</strong> {job.createdBy.company}
                    </span>
                    <span className="text-sm text-gray-700">
                      <strong>Posted on:</strong>{" "}
                      {new Date(job.postedDate).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-700">
                      <strong>Deadline:</strong>{" "}
                      {new Date(job.closingDate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>

            <Divider />

            <CardFooter className="p-4 bg-gray-50 mt-auto">
              <RouterLink to={`/user/jobs/${job._id}`}>
                <button className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm">
                  Apply Now
                </button>
              </RouterLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
