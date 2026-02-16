"use client";

import { useState } from "react";
import { buscarTicker } from "./lib/yahooClient";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [dados, setDados] = useState<any>(null);

  async function consultar() {
    const r = await buscarTicker(ticker.toUpperCase());
    setDados(r);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Consultor de Ativos</h1>

      <input
        placeholder="Digite PETR4"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      <button onClick={consultar}>Consultar</button>

      {dados && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(dados, null, 2)}
        </pre>
      )}
    </main>
  );
}
