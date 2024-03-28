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

export const addPeople = async ({ name, address }: { name: string; address: string }) => {
  try {
    await sql`INSERT INTO People (Name, Home) VALUES (${name}, ${address});`
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

export const editPeople = async ({ id, name, address }: { id: number; name: string; address: string }) => {
  try {
    await sql`UPDATE People SET Name = ${name}, Home = ${address} WHERE id = ${id};`
    return true
  } catch (error) {
    console.error(error)
  }
}
