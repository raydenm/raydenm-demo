"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useStore from "app/postgresql-admin/store"
import type { AdminParamsType } from "app/postgresql-admin/types/admin"
import { Button } from "components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { addData } from "db/admin"

const Add = () => {
  const { sqlConfig, getTableData, setPageNumber } = useStore((state) => state)
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
    addData({ sqlName: sqlConfig.sqlName, values })
      .then(() => {
        toast({
          title: "Success",
          description: "add success!",
        })
        setPageNumber(1)
        getTableData()
        setOpen(false)
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
    reset(sqlConfig.defaultValues)
  }

  if (!sqlConfig.sqlName) return null

  return (
    <Dialog open={open} onOpenChange={(value) => handOpenChange(value)}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-8">
            {(sqlConfig.fields || []).map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={item.field}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required={item.required}>{item.field}</FormLabel>
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Add
