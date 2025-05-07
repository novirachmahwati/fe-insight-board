"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LoginLocationChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://be-insight-board.onrender.com/api/login-per-location"
        );
        const data = await res.json();

        const labels = data.map((item) => item.location);
        const totals = data.map((item) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Logins",
              data: totals,
              backgroundColor: "#3b82f6",
              borderRadius: 4,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch login per location", err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
        },
      },
    },
  };

  if (!chartData) return <p>Loading...</p>;

  return <Bar data={chartData} options={options} />;
}
