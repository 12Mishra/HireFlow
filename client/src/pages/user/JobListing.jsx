import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
} from "@nextui-org/react";
import companyLogo from "../../../src/assets/companyLogo.png";
import Loader from "../../components/common/Loader";
import Cookies from "js-cookie";
import axios from "axios";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userCookie = Cookies.get("authToken");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/user/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userCookie}`,
            },
          }
        );

        setJob(response.data.jobs);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Failed to fetch job details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, userCookie]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!job) {
    return (
      <div className="text-gray-500 text-center p-4">No job details found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex gap-3 items-center p-4 bg-gray-50">
          <Image
            alt="Company Logo"
            height={40}
            radius="sm"
            src={companyLogo}
            width={40}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-800">{job.jobTitle}</h2>
            <p className="text-sm text-gray-600">{job.companyName}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4">
          <p className="text-sm text-gray-700">{job.description}</p>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Location:</span>
              <span className="text-gray-600 ml-2">{job.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700">Salary:</span>
              <span className="text-gray-600 ml-2">{job.salary}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">
                <strong>Posted on:</strong>{" "}
                {new Date(job.postedDate).toLocaleString()}
              </span>
              <span className="text-sm text-gray-700">
                <strong>Deadline :</strong>{" "}
                {new Date(job.closingDate).toLocaleString()}
              </span>
            </div>
          </div>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
