import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import useStore from "store"
import { sqlConfigList } from "../data/sql"

const ChooseSql = () => {
  const sqlConfig = useStore((state) => state.sqlConfig)
  const setSqlConfig = useStore((state) => state.setSqlConfig)
  const onValueChange = (value: string) => {
    const data = sqlConfigList.find((item) => item.sqlName === value)
    if (data) setSqlConfig(data)
  }

  return (
    <Select onValueChange={onValueChange} defaultValue={sqlConfig?.sqlName}>
      <SelectTrigger className="w-[180px]">
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
