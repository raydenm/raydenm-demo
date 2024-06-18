"use server"

import { sql } from "@vercel/postgres"
import dayjs from "dayjs"
import type { AdminParamsType, AdminTableData, FieldsType } from "app/admin/types/admin"
import { jwtVerifyToken } from 'lib/jwt'

const getAddParams = (data: AdminParamsType) => {
  const labels = []
  const values = []
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (data[key] !== undefined) {
        labels.push(key)
        values.push(`'${data[key]}'`)
      }
    }
  }
  const labelString = labels.join(", ")
  const valueString = values.join(", ")
  return { labelString, valueString }
}

const getEditParams = (data: AdminParamsType) => {
  const newData: AdminParamsType = { ...data, update_time: dayjs().format("YYYY-MM-DD HH:mm:ss") }
  delete newData.id
  delete newData.create_time
  let values = []
  for (const key in newData) {
    if (Object.hasOwnProperty.call(newData, key)) {
      if (newData[key] !== undefined && newData[key] !== null) {
        values.push(`${key} = '${newData[key]}'`)
      }
    }
  }
  return values.join(", ")
}

export const getData = async ({
  sqlName,
  pageNumber = 1,
  pageSize = 10,
  searchField = [],
  searchValue = "",
  // cookie = ""
}: {
  sqlName: string
  pageNumber?: number
  pageSize?: number
  searchField: FieldsType
  searchValue?: string
  // cookie?: string
}) => {
  try {
    // const verdata = await jwtVerifyToken(cookie)
    // if (!verdata) {
    //   return {
    //     data: [],
    //     total: 0
    //   }
    // }
    const offset = (pageNumber - 1) * pageSize
    let query = `SELECT * FROM ${sqlName}`
    let countQuery = `SELECT COUNT(*) FROM ${sqlName}`
    const queryParams = []
    const countQueryParams = []

    if (searchValue && searchField.length > 0) {
      query += ` WHERE `
      countQuery += ` WHERE `
      for (let i = 0; i < searchField.length; i++) {
        if (!searchField[i]?.search) continue
        if (i > 0) {
          query += ` OR `
          countQuery += ` OR `
        }
        query += `${searchField[i]?.field} ILIKE $${queryParams.length + 1}`
        countQuery += `${searchField[i]?.field} ILIKE $${countQueryParams.length + 1}`
        queryParams.push(`%${searchValue}%`)
        countQueryParams.push(`%${searchValue}%`)
      }
    }

    query += ` ORDER BY id DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    queryParams.push(pageSize, offset)
    console.log(query, queryParams)

    const [result, countResult] = await Promise.all([
      sql.query(query, queryParams),
      sql.query(countQuery, countQueryParams),
    ])
    const { rows }: { rows: AdminTableData[] } = result
    const total = Number(countResult.rows[0].count)

    return { data: rows, total }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const addData = async ({ values, sqlName }: { values: AdminParamsType; sqlName: string }) => {
  try {
    const { labelString, valueString } = getAddParams(values)
    const query = `INSERT INTO ${sqlName} (${labelString}) VALUES (${valueString})`
    console.log(query)
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteData = async ({ id, sqlName }: { id: number; sqlName: string }) => {
  try {
    const query = `DELETE FROM ${sqlName} WHERE id = ${id};`
    console.log(query)
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const editData = async ({ id, values, sqlName }: { id: number; values: AdminParamsType; sqlName: string }) => {
  try {
    const value = getEditParams(values)
    const query = `UPDATE ${sqlName} SET ${value} WHERE id = ${id};`
    console.log(query)
    await sql.query(query)
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
