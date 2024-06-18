"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from 'cookies-next'
import { Loader2, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"

const formSchema = z.object({
  email: z.string().min(1, {
    message: "email is required.",
  }),
  password: z.string().min(1, {
    message: "password is required.",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { handleSubmit } = form

  const onSubmit = (values: { email: string, password: string }) => {
    setLoading(true)
    fetch('/api/signin', { method: 'POST', body: JSON.stringify(values) })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data: any) => {
        if (data.accessToken) {
          setCookie('token', data.accessToken)
          router.push('/')
        } else {
          toast({
            title: "Error",
            description: data.error
          })
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: '登录失败'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="place enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="place enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
                Login
              </Button>
            </div>
          </form>
        </Form>

      </CardContent>
    </Card>
  )
}

const Login = () => {
  return (
    <div className="absolute inset-0 -z-10 size-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex size-full items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login