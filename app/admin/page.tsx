"use client"

import { useEffect, useState } from "react"
import { getData } from "db/admin"
import useStore from "store"
import type { AdminTableData } from "types/admin"
import Add from "./components/add"
import ChooseSql from "./components/chooseSql"
import Tabel from "./components/table"

const Admin = () => {
  const [tableData, setTableData] = useState<AdminTableData[]>([])
  const sqlConfig = useStore((state) => state.sqlConfig)
  const hanldeGetData = async () => {
    const data = await getData({ sqlName: sqlConfig?.sqlName })
    setTableData(data || [])
  }

  useEffect(() => {
    setTableData([])
    hanldeGetData()
  }, [sqlConfig])

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl py-10">
        <div className="">
          <h1 className="mb-4 w-full max-w-2xl  text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Vercel Postgres
          </h1>
          <p className="max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
            Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions and your frontend
            framework.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex justify-between">
          <ChooseSql></ChooseSql>
          <Add getData={hanldeGetData}></Add>
        </div>
        <Tabel data={tableData} getData={hanldeGetData}></Tabel>
      </div>
    </section>
  )
}

export default Admin
