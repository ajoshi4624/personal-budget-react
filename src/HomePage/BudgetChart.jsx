import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getBudget } from "../services/budgetService";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236",
  "#166a8f", "#00a950", "#58595b", "#8549ba", "#ff9f40"
];

export default function BudgetChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    (async () => {
      const { labels, values } = await getBudget();
      setChartData({
        labels,
        datasets: [
          {
            label: "Budget",
            data: values,
            backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      });
    })();
  }, []);

  if (!chartData) return <p>Loading chart…</p>;
  return <div style={{ maxWidth: 520, margin: "0 auto" }}><Doughnut data={chartData} /></div>;
}
