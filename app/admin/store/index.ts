import { getCookie } from 'cookies-next'
import { create } from "zustand"
import { AdminTableData, SqlConfigType } from "app/admin/types/admin"
import { getData } from "db/admin"

type State = {
  sqlConfig: SqlConfigType
  tableData: AdminTableData[]
  pageNumber: number
  pageSize: number
  searchValue: string
  total: number
  isLoading: boolean
}

type Action = {
  setSqlConfig: (userInfo: State["sqlConfig"]) => void
  setTableData: (tableData: State["tableData"]) => void
  setPageNumber: (pageNumber: State["pageNumber"]) => void
  setPageSize: (pageSize: State["pageSize"]) => void
  setSearchValue: (searchValue: State["searchValue"]) => void
  setTotal: (total: State["total"]) => void
  getTableData: () => Promise<void>
}

const useStore = create<State & Action>((set, get) => ({
  tableData: [],
  sqlConfig: {} as SqlConfigType,
  pageNumber: 1,
  pageSize: 10,
  searchValue: "",
  total: 0,
  isLoading: false,
  setSqlConfig: (data) => {
    set(() => ({ sqlConfig: data }))
  },
  setTableData: (data) => {
    set(() => ({ tableData: data }))
  },
  setPageNumber: (data) => {
    set(() => ({ pageNumber: data }))
  },
  setPageSize: (data) => {
    set(() => ({ pageSize: data }))
  },
  setSearchValue: (data) => {
    set(() => ({ searchValue: data }))
  },
  setTotal: (data) => {
    set(() => ({ total: data }))
  },
  getTableData: async () => {
    const { sqlConfig, pageNumber, pageSize, searchValue } = get()
    if (!sqlConfig.sqlName) return
    set(() => ({ isLoading: true }))
    const { data = [], total = 0 } = await getData({
      sqlName: sqlConfig?.sqlName,
      pageNumber,
      pageSize,
      searchField: sqlConfig?.fields,
      searchValue,
      // cookie: getCookie("token") as string
    })
    set(() => ({ tableData: data, total, isLoading: false }))
  },
}))

export default useStore
