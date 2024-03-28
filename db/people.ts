"use server"

import { sql } from "@vercel/postgres"
import type { Peoples } from "types/peopele"

export const getPeople = async () => {
  try {
    const { rows }: { rows: Peoples[] } = await sql`SELECT * FROM People ORDER BY id DESC;`
    return rows
  } catch (error) {
    console.error(error)
  }
}

export const addPeople = async (name: string, home: string) => {
  try {
    await sql`INSERT INTO People (Name, Home) VALUES (${name}, ${home});`
    return true
  } catch (error) {
    console.error(error)
  }
}

export const deletePeople = async (id: number) => {
  try {
    await sql`DELETE FROM People WHERE id = ${id};`
    return true
  } catch (error) {
    console.error(error)
  }
}

export const editPeople = async (id: number, name: string, home: string) => {
  try {
    await sql`UPDATE People SET Name = ${name}, Home = ${home} WHERE id = ${id};`
    return true
  } catch (error) {
    console.error(error)
  }
}
