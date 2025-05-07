"use client";

import { useEffect, useState } from "react";

interface LoginData {
  id: number;
  name: string;
  email: string;
  location: string;
  device: string;
  loginAt: string;
}

const LoginTable = () => {
  const [logins, setLogins] = useState<LoginData[]>([]);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const res = await fetch(
          "https://be-insight-board.onrender.com/api/recent-logins"
        );
        const data = await res.json();

        const mappedData = data.map((item: any, index: number) => ({
          id: index + 1,
          name: item.name,
          email: item.email,
          location: item.location,
          device: item.device,
          loginAt: item.login_time,
        }));

        setLogins(mappedData);
      } catch (error) {
        console.error("Failed to fetch recent logins:", error);
      }
    };

    fetchLogins();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Logins</h2>
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">Email</th>
            <th className="text-left p-3 border-b">Location</th>
            <th className="text-left p-3 border-b">Device</th>
            <th className="text-left p-3 border-b">Login Time</th>
          </tr>
        </thead>
        <tbody>
          {logins.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.name}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">{user.location}</td>
              <td className="p-3 border-b">{user.device}</td>
              <td className="p-3 border-b">{user.loginAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginTable;
