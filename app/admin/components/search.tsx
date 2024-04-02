import useStore from "app/admin/store"
import { Input } from "components/ui/input"

const Search = () => {
  const { searchValue, setSearchValue, setPageNumber, sqlConfig } = useStore((state) => state)

  const handleSearch = (value: string) => {
    setPageNumber(1)
    setSearchValue(value)
  }

  if (!sqlConfig.sqlName) return null

  return (
    <Input
      className="ml-4 w-[300px]"
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={`search ${(sqlConfig.fields || [])
        .filter(({ search }) => search)
        .map(({ field }) => field)
        .join("/")}`}
    />
  )
}

export default Search
