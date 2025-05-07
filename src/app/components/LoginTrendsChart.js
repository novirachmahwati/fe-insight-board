"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LoginTrendsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://be-insight-board.onrender.com/api/login-trends"
        );
        const data = await res.json();

        const labels = data.map((item) => item.day);
        const totals = data.map((item) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Customers",
              data: totals,
              fill: false,
              borderColor: "#3b82f6",
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch login trends", err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (!chartData) return <p>Loading...</p>;

  return <Line data={chartData} options={options} />;
}
