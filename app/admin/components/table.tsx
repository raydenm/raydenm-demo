"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"
import useStore from "store"
import type { AdminTableData } from "types/admin"
import Delete from "./delete"
import Edit from "./edit"

const AdminTable = ({ data, getData }: { data: AdminTableData[]; getData: () => void }) => {
  const sqlConfig = useStore((state) => state.sqlConfig)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {sqlConfig.fields.map((item, index) => (
            <TableHead key={index}>{item.field}</TableHead>
          ))}
          <TableHead className="text-right">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(data || []).map((item) => (
          <TableRow key={item.id}>
            {sqlConfig.fields.map(({ field }, index) => (
              <TableCell key={index}>{item[field] ?? "-"}</TableCell>
            ))}
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-4">
                <Delete getData={getData} data={item}></Delete>
                <Edit getData={getData} data={item}></Edit>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminTable
