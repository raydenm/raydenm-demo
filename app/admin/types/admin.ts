export type AdminTableData = {
  [key: string]: string | number
  id: number
  create_time: string
  update_time: string
}

export type FieldsType = {
  field: string
  required?: boolean
  type?: string
  search?: boolean
}[]

export type SqlConfigType = {
  sqlName: string
  fields: FieldsType
  searchField?: string
  formSchema?: {}
  defaultValues?: {
    [key: string]: string | number
  }
}
export type AdminParamsType = {
  [key: string]: string | number
}
