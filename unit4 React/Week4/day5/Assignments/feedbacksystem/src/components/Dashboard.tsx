import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { format } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard: React.FC = () => {
  const items = useSelector((s: RootState) => s.feedback.items);

  // Ratings distribution
  const distribution = [1,2,3,4,5].map(r => items.filter(i => i.rating === r).length).reverse(); // 5..1

  // Daily trends (last 14 days)
  const days = Array.from({length: 14}).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - idx));
    return format(d, "yyyy-MM-dd");
  });

  const dailyCounts = days.map(day => items.filter(i => i.createdAt.startsWith(day)).length);

  const barData = {
    labels: days,
    datasets: [
      {
        label: "Feedback count",
        data: dailyCounts,
      }
    ]
  };

  const pieData = {
    labels: ["5★","4★","3★","2★","1★"],
    datasets: [{ data: distribution }]
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Rating Distribution</h4>
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Last 14 Days</h4>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false }}}}/>
      </div>
    </div>
  );
};

export default Dashboard;
