"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editPeople } from "db/people";
import { Button } from "components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { Loader2, Pencil, Send } from "lucide-react";
import { Peoples } from "types/peopele";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name is required.",
  }),
  address: z.string().min(1, {
    message: "address is required.",
  }),
})

const AddPeople = ({ getData, data }: { data: Peoples; getData: () => void }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      address: data.home
    },
  })
  const { toast } = useToast()

  const { reset, handleSubmit } = form

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    editPeople(data.id, values.name, values.address).then(() => {
      toast({
        title: "Success",
        description: "people change success",
      })
      getData()
      setOpen(false)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handOpenChange = (value: boolean) => {
    setOpen(value)
    if (value) {
      reset({
        name: data.name,
        address: data.home
      })
    }
  }


  return (
    <Dialog open={open} onOpenChange={(value) => handOpenChange(value)}>
      <DialogTrigger asChild>
        <Button size='sm' className="">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit People</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Place enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Place enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPeople