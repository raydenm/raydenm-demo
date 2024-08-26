"use client"

import { Plus, SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"
import { SketchPicker } from "react-color"
import { Button } from "components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Separator } from "components/ui/separator"
import { useToast } from "components/ui/use-toast"

const defauleColorList = [
  { from: 72, to: 60, color: "#71d3e5" },
  { from: 81, to: 26, color: "#ffdbde" },
  // { from: 43, to: 0, color: "#ff85ad" },
  { from: 98, to: 41, color: "#ffb58a" },
  { from: 65, to: 11, color: "#6b66ff" },
  // { from: 41, to: 6, color: "#ff85a7" },
]

const defaultBgColor = "#ffffff"

const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return `rgb(${r}, ${g}, ${b})`
}

const Color = () => {
  const [colorList, setColorList] = useState<{ from?: number; to?: number; color: string }[]>(defauleColorList)
  const [bgColor, setBgColor] = useState(defaultBgColor)
  const { toast } = useToast()


  const randomBgStyle = () => {
    const newColorList = colorList.map(({ color }) => ({
      from: Math.floor(Math.random() * 101),
      to: Math.floor(Math.random() * 101),
      color,
    }))
    setColorList(newColorList)
  }

  const colorListChange = (data: string, index: number) => {
    const newColorList = [...colorList]
    newColorList[index] = { ...colorList[index], color: data }
    setColorList(newColorList)
  }

  const getBgStyle = () => {
    let base = ""
    colorList.forEach(({ from, to, color }, index) => {
      base =
        base +
        `radial-gradient(at ${from}% ${to}%, ${color} 0px, transparent 50%)${index !== colorList.length - 1 ? ", " : ""
        }`
    })
    return base
  }

  const colorListDelete = (index: number) => {
    const newColorList = [...colorList]
    newColorList.splice(index, 1)
    setColorList(newColorList)
  }

  const colorListAdd = () => {
    const newColorList = [...colorList]
    newColorList.push({
      from: Math.floor(Math.random() * 101),
      to: Math.floor(Math.random() * 101),
      color: getRandomColor(),
    })
    setColorList(newColorList)
  }

  const copyStr = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      toast({
        title: "Success",
        description: "copy success!",
      })
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = v;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast({
        title: "Success",
        description: "copy success!",
      })
    }
  }

  return (
    <div>
      <div
        className="h-screen w-screen flex justify-center items-center text-white font-bold text-3xl"
        onClick={randomBgStyle}
        style={{ backgroundColor: bgColor, backgroundImage: getBgStyle() }}
      >
        Click to switch color
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed right-5 top-5">
            <SlidersHorizontal className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="mr-4 w-[420px] rounded-3xl border-0 bg-primary"
        >
          <div className="pt-4 text-xl text-white">Settings</div>
          <Separator className="my-8 bg-slate-600" />
          <div className="mb-4 text-xl text-white">Color</div>
          <div className="flex flex-wrap">
            {colorList.map((item, index) => (
              <div key={index} className="group/coloritem relative">
                <div className="p-2">
                  <ChooseColor callback={(value) => colorListChange(value, index)} color={item.color}>
                    <div
                      style={{ backgroundColor: item.color }}
                      className="size-7 cursor-pointer rounded-full transition duration-300 hover:scale-110"
                    ></div>
                  </ChooseColor>
                </div>
                <div
                  onClick={() => colorListDelete(index)}
                  className="absolute right-0 top-0 hidden size-4 cursor-pointer items-center justify-center rounded-full bg-primary group-hover/coloritem:flex"
                >
                  <X className="size-3 text-white hover:opacity-80" />
                </div>
              </div>
            ))}
            <div className="p-2">
              <div
                onClick={colorListAdd}
                className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-gray-400 transition duration-300 hover:scale-110"
              >
                <Plus className="size-4 text-gray-400" />
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-slate-600" />
          <div className="mb-4 text-xl text-white">Background</div>
          <ChooseColor color={bgColor} callback={setBgColor}>
            <div
              style={{ backgroundColor: bgColor }}
              className="mb-8 size-7 cursor-pointer rounded-full transition duration-300 hover:scale-110"
            ></div>
          </ChooseColor>
        </PopoverContent>
      </Popover>
      <Button onClick={() => copyStr(
        `<div style='background-color: ${bgColor}; background-image: ${getBgStyle()}; height: 100%; width: 100%;'></div>`
      )} className="fixed right-24 top-5">
        Copy Code
      </Button>
    </div>
  )
}

const ChooseColor = ({
  children,
  color,
  callback,
}: {
  children: React.ReactNode
  color: string
  callback: (color: string) => void
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <SketchPicker
          color={color}
          onChange={(color) => {
            callback(color.hex)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default Color
