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

interface PainRecord {
  timestamp: number;
  painScore: number;
}

const PainChart: React.FC = () => {
  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("painHistory") : "[]";
  const painHistory: PainRecord[] = JSON.parse(storedData || "[]");

  if (!painHistory.length) {
    return <p className="text-center text-gray-500">통증 기록이 없습니다.</p>;
  }

  const dates = painHistory.map((record: PainRecord) =>
    new Date(record.timestamp).toLocaleDateString()
  );
  const scores = painHistory.map((record: PainRecord) => record.painScore);

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
