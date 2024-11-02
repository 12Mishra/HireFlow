import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-24 xl:py-24">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Streamline Your Hiring Process
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-800">
                HireFlow helps you find the right talent faster. Simplify
                recruitment and make better hiring decisions.
              </p>
            </div>
            <div className="space-x-4">
              <button className="bg-black text-white px-2 py-2 rounded-md">
                <Link to='/user/auth/signup'>Get Started</Link>
              </button>
              <button className="border-white border-4 hover:text-black py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
