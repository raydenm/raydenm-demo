"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Pencil, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { editData } from "db/admin"
import useStore from "store"
import { AdminTableData } from "types/admin"
import type { AdminParamsType } from "types/admin"

const Edit = ({ getData, data }: { data: AdminTableData; getData: () => void }) => {
  const sqlConfig = useStore((state) => state.sqlConfig)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm({
    // @ts-ignore
    resolver: zodResolver(sqlConfig.formSchema),
    defaultValues: sqlConfig.defaultValues,
  })
  const { toast } = useToast()

  const { reset, handleSubmit } = form

  const onSubmit = (values: AdminParamsType) => {
    setLoading(true)
    editData({ id: data.id, values, sqlName: sqlConfig.sqlName })
      .then(() => {
        toast({
          title: "Success",
          description: "change success!",
        })
        getData()
        setOpen(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handOpenChange = (value: boolean) => {
    setOpen(value)
    let newData: { [key: string]: string } = {}
    if (value) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          newData[key] = String(data[key])
        }
      }
      reset(newData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => handOpenChange(value)}>
      <DialogTrigger asChild>
        <Button size="sm" className="">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-8">
            {sqlConfig.fields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.field}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.field}</FormLabel>
                    <FormControl>
                      <Input placeholder="Place enter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Edit
