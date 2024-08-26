"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { BACKGROUND_OPTIONS } from "./components/background"
import Playground from "./components/playground"

export default function Home() {
  const [preview, setPreview] = useState<null | React.ReactNode>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const resetBg = () => {
    setPreview(null)
    setTheme("light")
  }

  return (
    <div className={`${theme}`}>
      <div className="fixed left-0 top-0 -z-10 size-full">{preview ? preview : null}</div>
      <div className="relative mx-auto h-screen w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="pt-8">
          <div className="relative mx-auto mt-10 flex max-w-2xl flex-col items-center">
            <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
              Collection of modern,{" "}
              <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                background snippets
              </span>
            </h2>
            <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
              Ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS and{" "}
              <span className="cursor-wait opacity-70">Vanilla CSS</span> for easy integration.
            </p>
            <div className="mt-10">
              <Button variant="secondary" onClick={resetBg}>
                Reset background
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden px-4 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
            {BACKGROUND_OPTIONS.map((background, index) => {
              return (
                <Playground key={index} setPreview={setPreview} theme={background.theme} setTheme={setTheme}>
                  {background.component}
                </Playground>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
