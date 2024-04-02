"use client"

import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import useStore from "app/admin/store"
import type { AdminTableData } from "app/admin/types/admin"
import { Button } from "components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { useToast } from "components/ui/use-toast"
import { deleteData } from "db/admin"

const Delete = ({ data }: { data: AdminTableData }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { sqlConfig, getTableData } = useStore((state) => state)
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
    setOpen(false)
    setLoading(true)
    deleteData({ sqlName: sqlConfig.sqlName, id })
      .then(() => {
        getTableData()
        toast({
          title: "Success",
          description: "delete success!",
        })
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handOpenChange = (value: boolean) => {
    setOpen(value)
  }

  return (
    <Popover open={open} onOpenChange={(value) => handOpenChange(value)}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Trash2 className="mr-2 size-4" />}
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-53 mt-1 p-3">
        <div className="text-center text-sm">
          <div>Are you sure to delete it?</div>
          <div className="mt-4 flex justify-around">
            <Button onClick={() => setOpen(false)} size="sm" className="h-7 text-sm">
              No
            </Button>
            <Button onClick={() => handleDelete(data.id)} variant="destructive" className="h-7 text-sm" size="sm">
              Yes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Delete
