import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/ativos.json");

export async function GET() {
  const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(dados);
}
