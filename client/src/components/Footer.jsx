import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Hiring?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of companies using HireFlow to find and hire top
                talent efficiently.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 space-x-2 flex">
                <input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="bg-black text-white px-2 py-2 rounded-md" type="submit">Sign Up</button>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-md text-gray-500 dark:text-gray-400">
          © 2024 HireFlow. 
        </p>
      </footer>
    </>
  );
}
