"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMobileAlt, FaGlobe } from "react-icons/fa";

interface StatItem {
  title: string;
  label: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

export default function InsightStatistics() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [locationRes, deviceRes, interestRes] = await Promise.all([
          fetch(
            "https://be-insight-board.onrender.com/api/most-popular-location"
          ),
          fetch("https://be-insight-board.onrender.com/api/most-used-device"),
          fetch(
            "https://be-insight-board.onrender.com/api/top-digital-interest"
          ),
        ]);

        const [locationData, deviceData, interestData] = await Promise.all([
          locationRes.json(),
          deviceRes.json(),
          interestRes.json(),
        ]);

        const result: StatItem[] = [
          {
            title: "Most Popular Location",
            label: locationData.location,
            percentage: locationData.percentage,
            icon: <FaMapMarkerAlt size={16} className="text-orange-500" />,
            color: "bg-orange-400",
          },
          {
            title: "Most Used Device Brand",
            label: deviceData.brand,
            percentage: deviceData.percentage,
            icon: <FaMobileAlt size={16} className="text-green-500" />,
            color: "bg-green-500",
          },
          {
            title: "Top Digital Interest",
            label: interestData.interest,
            percentage: interestData.percentage,
            icon: <FaGlobe size={16} className="text-blue-500" />,
            color: "bg-blue-500",
          },
        ];

        setStats(result);
      } catch (error) {
        console.error("Failed to fetch insight statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-5">
      {stats.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl shadow-sm"
            style={{ backgroundColor: `${item.color}20` }}
          >
            {item.icon}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{item.title}</p>
              <span className="text-sm font-semibold text-gray-700">
                {item.percentage.toFixed(2)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
