"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const router = useRouter();

  function buscar() {
    if (!ticker) return;
    router.push(`/ativo/${ticker.toUpperCase()}`);
  }

  return (
    <main style={{
      background: "#0b0f19",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      <h1>Consultor de Ativos 📈</h1>

      <input
        placeholder="Digite o ticker (ex: PETR4)"
        value={ticker}
        onChange={e => setTicker(e.target.value)}
        style={{
          padding: 12,
          fontSize: 18,
          borderRadius: 8,
          border: "none",
          marginTop: 20
        }}
      />

      <button
        onClick={buscar}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 8,
          background: "#22c55e",
          border: "none",
          cursor: "pointer"
        }}
      >
        Analisar
      </button>
    </main>
  );
}
