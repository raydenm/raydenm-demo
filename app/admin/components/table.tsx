"use client"

import Delete from "app/admin/components/delete"
import Edit from "app/admin/components/edit"
import useStore from "app/admin/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"

const AdminTable = () => {
  const { sqlConfig, tableData, searchValue, isLoading } = useStore((state) => state)

  const HighlightKeyword = ({ text }: { text: string }) => {
    if (!text || !searchValue) return <>{text}</>
    const regex = new RegExp(`(${searchValue})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, index) =>
      part.toLowerCase() === searchValue.toLowerCase() ? (
        <span key={index} className="text-[#2660FF]">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }
  if (!sqlConfig.sqlName) return null

  return (
    <Table isEmpty={tableData.length === 0 && !isLoading} isLoading={isLoading}>
      <TableHeader>
        <TableRow>
          {(sqlConfig.fields || []).map((item, index) => (
            <TableHead key={index}>{item.field}</TableHead>
          ))}
          <TableHead className="text-right">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(tableData || []).map((item) => (
          <TableRow key={item.id}>
            {(sqlConfig.fields || []).map(({ field, search }, index) => (
              <TableCell key={index}>
                {searchValue && search ? (
                  <HighlightKeyword text={item[field] as string}></HighlightKeyword>
                ) : (
                  String(item[field]) || "-"
                )}
              </TableCell>
            ))}
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-4">
                <Delete data={item}></Delete>
                <Edit data={item}></Edit>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminTable
