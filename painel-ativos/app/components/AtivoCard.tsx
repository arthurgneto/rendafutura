import Link from "next/link";

export default function AtivoCard({ ativo }: any) {
  return (
    <Link href={`/ativo/${ativo.ticker}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#111827",
          color: "white",
          borderRadius: 16,
          padding: 20,
          cursor: "pointer"
        }}
      >
        <h2>{ativo.ticker} {ativo.score}</h2>

        <p>{ativo.fundamentos.pl}</p>
        <p>{ativo.fundamentos.dy}</p>
        <p>{ativo.fundamentos.divida}</p>
        <p>{ativo.fundamentos.roe}</p>
        <p>{ativo.fundamentos.margem}</p>

        <p style={{ opacity: 0.7 }}>{ativo.resumo}</p>
      </div>
    </Link>
  );
}
