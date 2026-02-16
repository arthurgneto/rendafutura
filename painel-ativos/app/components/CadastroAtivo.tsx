"use client";

import { useState } from "react";

export default function CadastroAtivo() {
  const [ticker, setTicker] = useState("");

  async function adicionar() {
    await fetch("/api/ativos", {
      method: "POST",
      body: JSON.stringify({ ticker })
    });

    window.location.reload();
  }

  return (
    <div style={{
      background: "#1f2937",
      padding: 20,
      borderRadius: 16,
      marginBottom: 20
    }}>
      <input
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Ticker ex: PETR4"
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={adicionar}>Adicionar</button>
    </div>
  );
}
