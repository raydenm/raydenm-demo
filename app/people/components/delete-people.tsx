import { deletePeople } from "db/people"
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import type { Peoples } from "types/peopele"
import { Button } from "components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover"
import { useToast } from "components/ui/use-toast"

const DeleteButton = ({ data, getData }: { data: Peoples; getData: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = async (data: Peoples) => {
    setOpen(false)
    setLoading(true)
    const res = await deletePeople(data.id)
    if (res) {
      getData()
      toast({
        title: "Success",
        description: "people delete success",
      })
    }
    setLoading(false)
  }

  const handOpenChange = (value: boolean) => {
    setOpen(value)
  }

  return (
    <Popover open={open} onOpenChange={(value) => handOpenChange(value)}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-53 mt-1 p-3">
        <div className="text-center text-sm">
          <div>Are you sure to delete it?</div>
          <div className="flex justify-around mt-4">
            <Button onClick={() => setOpen(false)} size="sm" className="h-7 text-sm">No</Button>
            <Button onClick={() => handleDelete(data)} variant="destructive" className="h-7 text-sm" size="sm">Yes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteButton