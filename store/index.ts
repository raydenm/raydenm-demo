import { create } from "zustand"
import { sqlConfigList } from "app/admin/data/sql"
import { SqlConfigType } from "types/admin"

type State = {
  sqlConfig: SqlConfigType
}

type Action = {
  setSqlConfig: (userInfo: State["sqlConfig"]) => void
}

const useStore = create<State & Action>((set) => ({
  sqlConfig: sqlConfigList[0] as SqlConfigType,
  setSqlConfig: (data) => {
    set(() => ({ sqlConfig: data }))
  },
}))

export default useStore
