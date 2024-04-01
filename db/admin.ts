"use server"

import { sql } from "@vercel/postgres"
import dayjs from "dayjs"
import type { AdminParamsType, AdminTableData } from "types/admin"

const getAddParams = (data: AdminParamsType) => {
  const labels = [];
  const values = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (data[key] !== undefined) {
        labels.push(key);
        values.push(`'${data[key]}'`);
      }
    }
  }
  const labelString = labels.join(', ');
  const valueString = values.join(', ');
  return { labelString, valueString };
}

const getEditParams = (data: AdminParamsType) => {
  const newData: AdminParamsType = { ...data, update_time: dayjs().format('YYYY-MM-DD HH:mm:ss') }
  delete newData.id;
  delete newData.create_time;
  let values = []
  for (const key in newData) {
    if (Object.hasOwnProperty.call(newData, key)) {
      if (newData[key] !== undefined && data[key] !== null) {
        values.push(`${key} = '${newData[key]}'`);
      }
    }
  }
  return values.join(', ');
};

export const getData = async ({ sqlName }: { sqlName?: string }) => {
  try {
    const query = `SELECT * FROM ${sqlName} ORDER BY id DESC;`
    const { rows }: { rows: AdminTableData[] } = await sql.query(query)
    return rows
  } catch (error) {
    console.error(error)
  }
}

export const addData = async ({ values, sqlName }: { values: AdminParamsType; sqlName: string }) => {
  try {
    const { labelString, valueString } = getAddParams(values)
    const query = `INSERT INTO ${sqlName} (${labelString}) VALUES (${valueString})`
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
  }
}

export const deleteData = async ({ id, sqlName }: { id: number; sqlName: string }) => {
  try {
    const query = `DELETE FROM ${sqlName} WHERE id = ${id};`
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
  }
}

export const editData = async ({ id, values, sqlName }: { id: number; values: AdminParamsType; sqlName: string }) => {
  try {
    const value = getEditParams(values)
    const query = `UPDATE ${sqlName} SET ${value} WHERE id = ${id};`
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
  }
}
