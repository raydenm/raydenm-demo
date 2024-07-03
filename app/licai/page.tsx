"use client"

import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"

const Demo = () => {
  const [tableData, setTableData] = useState<{
    year: number;
    age: number;
    zTotal: number;
    total: number;
    lastyearMy: number;
    allLi: number;
  }[]>([])

  // 参加工作时间
  const [goWork, setGoWork] = useState(2017) 

  // 出生年份
  const [born, setBorn] = useState(1995)

  // 家庭平均年收入(净值, 除去日常开销, 剩下的, 可用于投资理财) 单位万
  const [income, setIncome] = useState(6)

  // 投资预计年利率
  const [rate, setRate] = useState(0.05)

  // 计算至哪一年 
  const [toYear, setToYear] = useState(2060)
  

  const getTotal = (i: number) => {
    let total = 0
    let lastTotal = 0
    for (let j = goWork; j < i; j++) {
      const ly = getLastYearMy(lastTotal)
      lastTotal = total
      total = lastTotal + ly + income
    }

    return total
  }

  const getLastYearMy = (data: number) => {
    return data * rate
  }

  const getAllLi = (i: number) => {
    let total = 0
    for (let j = goWork; j < i; j++) {
      const ly = getLastYearMy(getTotal(j))
      total = ly + total
    }

    return total
  }

  const init = () => {
    let data = []
    for (let i = goWork; i < toYear + 1; i++) {
      data.push({
        year: i,
        age: i - born + 1,
        zTotal: (i - goWork + 1) * income,
        total: getTotal(i + 1),
        lastyearMy: getLastYearMy(getTotal(i)),
        allLi: getAllLi(i)
      })
    }
    console.log(data);

    setTableData(data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="max-w-[500px] mx-auto p-5">
      <div className="flex flex-col gap-y-2 text-sm mb-5">
        <div>参加工作年限</div>
        <Input type="number" value={goWork} onChange={(e) => setGoWork(Number(e.target.value))} />
        <div>出生日期</div>
        <Input type="number" value={born} onChange={(e) => setBorn(Number(e.target.value))} />
        <div>年投入理财(万)</div>
        <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
        <div>年收益</div>
        <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        <div>年限</div>
        <Input type="number" value={toYear} onChange={(e) => setToYear(Number(e.target.value))} />
        <Button onClick={init}>计算</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>年份</TableHead>
            <TableHead>年龄</TableHead>
            <TableHead>实际投入</TableHead>
            <TableHead>上年收益</TableHead>
            <TableHead>总资产</TableHead>
            <TableHead>总收益</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(tableData || []).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.zTotal}</TableCell>
              <TableCell>{item.lastyearMy.toFixed(2)}</TableCell>
              <TableCell>{item.total.toFixed(2)}</TableCell>
              <TableCell>{item.allLi.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
   
  )
}

export default Demo