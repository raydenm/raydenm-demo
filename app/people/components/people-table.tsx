import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table"
import type { Peoples } from "types/peopele"
import DeletePeople from "./delete-people";
import EditPeople from './edit-people';

const PeopleTable = ({ data, getData }: { data: Peoples[]; getData: () => void }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(data || []).map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-80">{item.name}</TableCell>
            <TableCell>{item.home}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-4">
                <EditPeople getData={getData} data={item}></EditPeople>
                <DeletePeople getData={getData} data={item}></DeletePeople>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PeopleTable