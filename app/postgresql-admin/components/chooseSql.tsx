"use client"

import { sqlConfigList } from "app/postgresql-admin/data/sql"
import useStore from "app/postgresql-admin/store"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"

const ChooseSql = () => {
  const { sqlConfig, setTableData, setPageNumber, setSearchValue } = useStore((state) => state)
  const setSqlConfig = useStore((state) => state.setSqlConfig)
  const onValueChange = (value: string) => {
    const data = sqlConfigList.find((item) => item.sqlName === value)
    if (data) {
      setSearchValue("")
      setTableData([])
      setPageNumber(1)
      setSqlConfig(data)
    }
  }

  return (
    <Select onValueChange={onValueChange} defaultValue={sqlConfig?.sqlName}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Select Sql" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sqlConfigList.map((item, index) => (
            <SelectItem key={index} value={item.sqlName}>
              {item.sqlName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ChooseSql
