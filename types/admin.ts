export type AdminTableData = {
  [key: string]: string | number
  id: number
  create_time: string
  update_time: string
}

export type SqlConfigType = {
  sqlName: string
  fields: { field: string; required?: boolean; type?: string }[]
  formSchema?: {}
  defaultValues?: {
    [key: string]: string | number
  }
}
export type AdminParamsType = {
  [key: string]: string | number
}
