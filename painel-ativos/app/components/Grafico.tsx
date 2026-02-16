"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function Grafico({ ticker }: any) {
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/historico/${ticker}`)
      .then(r => r.json())
      .then(setDados);
  }, [ticker]);

  if (!dados) return <p>Carregando gráfico…</p>;

  const styledData = {
    ...dados,
    datasets: dados.datasets.map((d: any) => ({
      ...d,
      borderColor: "#22c55e",          // linha verde forte
      backgroundColor: "rgba(34,197,94,0.2)", // preenchimento suave
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6
    }))
  };

  return (
    <div style={{
      background: "#0f172a",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 0 25px rgba(34,197,94,0.15)"
    }}>
      <Line
        data={styledData}
        options={{
          responsive: true,
          animation: {
            duration: 1500,
            easing: "easeOutQuart"
          },
          plugins: {
            tooltip: {
              backgroundColor: "#020617",
              borderColor: "#22c55e",
              borderWidth: 1,
              titleColor: "#22c55e",
              bodyColor: "white"
            }
          },
          scales: {
            x: {
              ticks: { color: "#cbd5f5" },
              grid: { color: "rgba(255,255,255,0.05)" }
            },
            y: {
              ticks: { color: "#cbd5f5" },
              grid: { color: "rgba(255,255,255,0.05)" }
            }
          }
        }}
      />
    </div>
  );
}
