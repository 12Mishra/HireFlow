import {SearchIcon, UsersIcon, BriefcaseIcon} from "lucide-react";
export default function Features() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <SearchIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Smart Candidate Matching</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI-powered algorithm matches candidates to your job
                requirements with high accuracy.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <UsersIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Collaborative Hiring</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Easily involve team members in the hiring process with our
                collaborative tools.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <BriefcaseIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Automated Workflows</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Streamline your hiring process with customizable, automated
                workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
