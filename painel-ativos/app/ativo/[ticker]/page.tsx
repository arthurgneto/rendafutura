import Grafico from "../../components/Grafico";
import { pegarFundamentos } from "../../lib/fundamentos";
import { calcularScore } from "../../lib/score";
function mostrar(v: any, sufixo = "") {
  if (v == null) return "N/D";
  return `${v}${sufixo}`;
}


export default async function Ativo({ params }: any) {
  const { ticker } = await params;

  const fundamentos = await pegarFundamentos(ticker);

  if (!fundamentos) {
    return <p>Erro ao carregar ativo</p>;
  }

  const score = calcularScore(fundamentos);

  return (<main style={{
  background: "#0b0f19",
  minHeight: "100vh",
  padding: 40,
  color: "white",
  lineHeight: 1.6
}}>
  <h1>{ticker}</h1>

  <Grafico ticker={ticker} />

  <h2>Score Inteligente ⭐ {score}/8</h2>

<h2>Saúde da empresa</h2>

{fundamentos.pl != null && (
  <p>
    <b>P/L:</b> {fundamentos.pl} <br />


    👉 Se nada mudar, a empresa se paga em {fundamentos.pl} anos.
  </p>
)}

{fundamentos.dy != null && (
  <p>
    <b>Dividend Yield:</b> {fundamentos.dy}% <br />


    👉 Ela devolve cerca de {fundamentos.dy}% ao ano para os acionistas.
  </p>
)}

{fundamentos.roe != null && (
  <p>
    <b>ROE:</b> {fundamentos.roe}% <br />


    👉 Mostra o quão eficiente a empresa é para gerar lucro.
  </p>
)}

{fundamentos.divida != null && (
  <p>
    <b>Dívida:</b> {fundamentos.divida} <br />


    👉 Empresas com muita dívida assumem mais risco.
  </p>
)}

{fundamentos.margem != null && (
  <p>
    <b>Margem:</b> {fundamentos.margem}% <br />

    
    👉 Quanto sobra de dinheiro após pagar os custos.
  </p>
)}


 <h2>Sobre a empresa</h2>

<p style={{ opacity: 0.9 }}>
  {fundamentos.descricao}
</p>

<p>
  <b>Setor:</b> {fundamentos.setor} <br />
  <b>País:</b> {fundamentos.pais}
</p>


  {score >= 6 && (
    <p>
      A empresa apresenta fundamentos fortes.
      Ela gera lucro, distribui dividendos e mantém estabilidade.
      É um ativo saudável para longo prazo.
    </p>
  )}

  {score >= 3 && score < 6 && (
    <p>
      A empresa tem pontos positivos,
      mas exige atenção em crescimento e rentabilidade.
      Pode ser interessante, mas precisa acompanhamento.
    </p>
  )}

  {score < 3 && (
    <p>
      Os fundamentos indicam risco elevado.
      A empresa pode estar enfrentando dificuldades.
      Investidores devem analisar com cautela.
    </p>
  )}

  <h2>O que isso significa?</h2>

  <p>
    Nenhum indicador sozinho define se uma empresa é boa.
    Sempre observe o conjunto:
    lucro, dívida, crescimento e estabilidade.
    Investir é entender a história completa.
  </p>
</main>

  );
}
