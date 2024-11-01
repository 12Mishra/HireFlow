import { BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center mx-2" href="#">
            <BriefcaseIcon className="h-6 w-6 mr-2" />
            <span className="text-2xl font-extrabold"><Link to='/'>HireFlow</Link></span>
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
              <Link to="/user/auth/login">For Applicant</Link>
            </button>
            <button className="text-md font-medium bg-black text-white px-2 py-2 rounded-md">
            <Link to="/recruiter/auth/login">For Recruiter</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
