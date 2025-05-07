import { FaEnvelope, FaBell, FaCircleUser } from "react-icons/fa6";

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center border-b border-gray-300">
      <div>
        <h1 className="text-xl font-semibold">Weekly Summary</h1>
        <h2 className="text-sm text-gray-600">
          Track trends, spot insights, and make smarter decisions—every week.
        </h2>
      </div>
      <div className="flex items-center space-x-4 text-gray-400">
        <FaEnvelope className="w-4 h-4" />
        <div className="relative">
          <FaBell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />
        </div>
        <div className="flex items-center space-x-2">
          <FaCircleUser className="w-7 h-7 text-yellow-400" />
          <div>
            <div className="text-sm font-semibold text-black">Novi</div>
            <div className="text-sm text-gray-400">Admin account</div>
          </div>
        </div>
      </div>
    </div>
  );
}
