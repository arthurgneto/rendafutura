import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/ativos.json");

export async function POST(req: Request) {
  const { ticker } = await req.json();

  const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const existe = dados.find((a: any) => a.ticker === ticker);

  if (existe) {
    return NextResponse.json({ ok: false, erro: "Já existe" });
  }

  dados.push({ ticker });

  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));

  return NextResponse.json({ ok: true });
}
