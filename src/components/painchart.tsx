// src/components/PainChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Chart.js 스케일 및 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PainChart: React.FC = () => {
  const storedData = localStorage.getItem("painHistory");
  const painHistory = JSON.parse(storedData || "[]");

  const dates = painHistory.map((record: any) =>
    new Date(record.timestamp).toLocaleDateString()
  );
  const scores = painHistory.map((record: any) => record.painScore);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "통증 점수",
        data: scores,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">통증 기록 그래프</h2>
      <Line data={data} />
    </div>
  );
};

export default PainChart;
