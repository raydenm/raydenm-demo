import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sql`CREATE TABLE People ( ID SERIAL PRIMARY KEY, Name VARCHAR(255), Home VARCHAR(255) );`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
