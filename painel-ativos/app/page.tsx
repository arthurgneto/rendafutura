import AtivoCard from "./components/AtivoCard";
import CadastroAtivo from "./components/CadastroAtivo";
import Educativo from "./components/Educativo";
import { getAtivos } from "./lib/getAtivos";

export default async function Home() {
  const ativos = await getAtivos();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f19",
        padding: "40px",
        fontFamily: "sans-serif"
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "32px",
          marginBottom: "20px"
        }}
      >
        Painel Fundamentalista
      </h1>

      {/* Cadastro */}
      <CadastroAtivo />

      {/* Bloco educativo */}
      <Educativo />

      {/* Grid de ativos */}
      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
        }}
      >
        {ativos.map((a: any) => (
          <AtivoCard key={a.ticker} ativo={a} />
        ))}
      </div>
    </main>
  );
}
