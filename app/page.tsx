"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
const pageList = [
  {
    title: "Background gradient animation",
    description:
      "Background gradient animation is a dynamic visual effect achieved by smoothly transitioning colors in a gradient pattern.",
    href: "/background-gradient-animation",
  },
  {
    title: "Vercel postgres",
    description:
      "Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions and your frontend framework.",
    href: "/people",
  },
  {
    title: "Background snippets",
    description:
      "Ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS and Vanilla CSS for easy integration.",
    href: "/bg",
  },
  {
    title: "Custom background color",
    description:
      "Custom background color feature allows users to personalize their digital environment with colors of their choice.",
    href: "/color",
  },
  {
    title: "Boilerplate",
    description: "Jumpstart your enterprise project with our feature-packed, high-performance Next.js boilerplate! ",
    href: "/boilerplate",
  },
]

const Home = () => {
  const router = useRouter()

  return (
    <div className="mx-auto h-screen w-full max-w-7xl px-6 md:px-8 lg:px-12">
      <div className="grid gap-4 pt-20 md:grid-cols-2 lg:grid-cols-4">
        {pageList.map(({ title, description, href }, index) => (
          <Card key={index} className="flex w-full flex-col justify-between">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button onClick={() => router.push(href)}>
                Go
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home
