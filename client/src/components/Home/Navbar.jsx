import { BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const userCookie = Cookies.get("authToken");
  const recruiterCookie = Cookies.get("authRecruiterToken");

  function handleLogout(){

    if(userCookie){
      Cookies.remove("authToken");
      window.location.reload();

    }
    if(recruiterCookie){
      Cookies.remove("authRecruiterToken");
      window.location.reload();

    }
    
  }
  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center mx-2">
            <BriefcaseIcon className="h-6 w-6 mr-2" />
            <span className="text-2xl font-extrabold">
              <Link to="/">HireFlow</Link>
            </span>
          </div>
          <div className="hidden md:flex space-x-4">
            {userCookie && (
              <>
                <Link to="/user/jobopenings">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    Job Openings
                  </button>
                </Link>
                <Link to="/my-applications">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    My Applications
                  </button>
                </Link>
                <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
            {recruiterCookie && (
              <>
                <Link to="/jobs/addjob">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    Post a Job
                  </button>
                </Link>
                {/* <Link to="/user/myjobpostings">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    My Job Postings
                  </button>
                </Link> */}
                <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
            {!userCookie && !recruiterCookie && (
              <>
                <Link to="/user/auth/login">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    For Applicant
                  </button>
                </Link>
                <Link to="/recruiter/auth/login">
                  <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
                    For Recruiter
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
