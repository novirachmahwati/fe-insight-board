"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiMapPin, FiUserCheck } from "react-icons/fi";
import LoginTrendsChart from "./components/LoginTrendsChart";
import LoginLocationChart from "./components/LoginLocationChart";
import LoginTable from "./components/LoginTable";
import InsightStatistics from "./components/InsightStatistics";
import GenderPieChart from "./components/GenderPieChart";

export default function DashboardPage() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, locationsRes, ageRes] = await Promise.all([
          fetch("https://be-insight-board.onrender.com/api/total-customers"),
          fetch("https://be-insight-board.onrender.com/api/total-locations"),
          fetch("https://be-insight-board.onrender.com/api/average-age"),
        ]);

        const customersData = await customersRes.json();
        const locationsData = await locationsRes.json();
        const ageData = await ageRes.json();

        setTotalCustomers(customersData.totalCustomers);
        setTotalLocations(locationsData.totalLocations);
        setAverageAge(ageData.averageAge);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FiUsers size={32} className="text-blue-700" />
          <div>
            <h2 className="text-sm text-blue-700 font-medium">
              Total Customers
            </h2>
            <p className="text-2xl font-bold text-blue-900">{totalCustomers}</p>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FiMapPin size={32} className="text-green-700" />
          <div>
            <h2 className="text-sm text-green-700 font-medium">
              Total Locations
            </h2>
            <p className="text-2xl font-bold text-green-900">
              {totalLocations}
            </p>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FiUserCheck size={32} className="text-yellow-700" />
          <div>
            <h2 className="text-sm text-yellow-700 font-medium">
              Average User Age
            </h2>
            <p className="text-2xl font-bold text-yellow-900">{averageAge}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Login Trends Over Time</h2>
          <LoginTrendsChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Login per Location</h2>
          <LoginLocationChart />
        </div>
      </div>

      <div className="mt-6">
        <LoginTable />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Insight Statistics</h2>
          <InsightStatistics />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Distribution by Gender</h2>
          <GenderPieChart />
        </div>
      </div>
    </div>
  );
}
