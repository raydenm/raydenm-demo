"use client"

import { useEffect, useState } from "react"
import { getPeople } from "db/people"
import type { Peoples } from "types/peopele"
import AddPeople from "./components/add-people"
import PeopleTabel from "./components/people-table"

const People = () => {
  const [tableData, setTableData] = useState<Peoples[]>([])
  const getData = async () => {
    const data = await getPeople()
    setTableData(data || [])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          <h1 className="mb-4 w-full max-w-2xl text-center text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Vercel Postgres
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions and your frontend
            framework.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <AddPeople getData={getData}></AddPeople>
        <PeopleTabel data={tableData} getData={getData}></PeopleTabel>
      </div>
    </section>
  )
}

export default People
