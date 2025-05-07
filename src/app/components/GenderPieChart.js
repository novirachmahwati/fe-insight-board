"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const res = await fetch(
          "https://be-insight-board.onrender.com/api/gender"
        );
        const data = await res.json();

        const labels = data.map((item) => item.gender);
        const values = data.map((item) => item.count);

        const colors = ["#3B82F6", "#EC4899", "#A855F7"];

        setChartData({
          labels,
          datasets: [
            {
              label: "Gender Distribution",
              data: values,
              backgroundColor: colors.slice(0, labels.length),
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch gender data:", error);
      }
    };

    fetchGenderData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="w-[250px] h-full">
        {chartData ? (
          <Pie data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default GenderPieChart;
