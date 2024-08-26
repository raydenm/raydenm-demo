"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
const pageList = [
  {
    title: "背景渐变动画",
    description:
      "背景渐变动画是通过渐变图案中平滑过渡颜色实现的动态视觉效果。",
    href: "/background-gradient-animation",
  },
  {
    title: "Vercel postgres",
    description:
      "Vercel Postgres是一个无服务器 PostgreSQL 数据库，实现配置化生成界面增删改查。",
    href: "/postgresql-admin",
  },
  {
    title: "背景代码片段",
    description:
      "使用 Tailwind CSS 和 Vanilla CSS 制作，随时可用，只需复制并粘贴到项目中即可。",
    href: "/bg-snippets",
  },
  {
    title: "随机背景颜色",
    description:
      "自定义多种主题色, 随机生成绚丽背景颜色",
    href: "/bg-color",
  },
  {
    title: "Next Boilerplate",
    description: "功能丰富、高性能的 Next.js 样板快速启动您的企业项目！",
    href: "/next-boilerplate",
  },
  {
    title: "理财管理",
    description: "自定义参数模拟理财及统计, 做时间的朋友。",
    href: "/financial-management",
  },
  {
    title: "图床",
    description: "利用Telegraph实现无限存储，使用WordPress缓存，并通过CloudFlare加速。",
    href: "https://img-storage.pages.dev",
  },
]

const Home = () => {
  const router = useRouter()

  const goPage = (href: string) => {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href)
    } else {
      router.push(href)
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-4 lg:px-12">
      <div className="text-2xl font-bold mt-12">CODE DEMO</div>
      <div className="grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-4">
        {pageList.map(({ title, description, href }, index) => (
          <Card key={index} className="flex w-full flex-col justify-between">
            <CardHeader>
              <CardTitle className="mb-4">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button size={'sm'} onClick={() => goPage(href)}>
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
