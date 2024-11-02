import Loader from '../../components/common/Loader';
import useProfile from '../../hooks/useProfile';

export default function Profile() {
  const {
    location,
    setLocation,
    aboutMe,
    setAboutMe,
    techSkills,
    setTechSkills,
    degree,
    setDegree,
    loading,
    error,
    user,
    handleProfileSubmit,
  } = useProfile();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-2">Create Job Profile</h2>
        {loading && <div className="text-center"><Loader /></div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {user && (
          <div className="mb-4 text-center">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
          </div>
        )}

        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full p-2 border rounded"
              placeholder="Enter your location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="aboutMe">
              About Me
            </label>
            <textarea
              id="aboutMe"
              className="w-full p-2 border rounded"
              placeholder="Tell us about yourself"
              required
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="techSkills">
              Tech Skills
            </label>
            <input
              type="text"
              id="techSkills"
              className="w-full p-2 border rounded"
              placeholder="Enter your tech skills (comma separated)"
              required
              value={techSkills.join(", ")} // Join the array for display
              onChange={(e) => setTechSkills(e.target.value.split(",").map(skill => skill.trim()))} // Split and trim
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="degree">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              className="w-full p-2 border rounded"
              placeholder="Enter your highest degree"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
