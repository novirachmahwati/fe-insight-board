"use client";

import Image from "next/image";
import {
  FiPieChart,
  FiUsers,
  FiMapPin,
  FiClock,
  FiSmartphone,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Overview",
    path: "/",
    icon: <FiPieChart size={15} />,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <FiUsers size={15} />,
  },
  {
    title: "Locations",
    path: "/locations",
    icon: <FiMapPin size={15} />,
  },
  {
    title: "Login Trends",
    path: "/logins",
    icon: <FiClock size={15} />,
  },
  {
    title: "Devices & Interests",
    path: "/devices",
    icon: <FiSmartphone size={15} />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 size={15} />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiSettings size={15} />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <FiLogOut size={15} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-300 flex flex-col">
      <div className="flex justify-center py-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={170}
          height={50}
          className="object-contain"
        />
      </div>
      <nav className="p-6 space-y-4">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition font-medium text-gray-500 ${
                isActive
                  ? "text-black bg-gray-100"
                  : "text-gray-500 hover:text-gray-500 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
