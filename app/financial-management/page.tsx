"use client"

import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"

const FinancialManagement = () => {
  const [tableData, setTableData] = useState<{
    year: number; // 年份
    age: number; // 年龄
    putTotal: number; // 实际投入
    total: number; // 总资产
    lastyearMy: number; // 上年理财收益
    allLi: number; // 累计理财收益
    yearHuanKuan: number; // 年总还款(公积金)
    principal: number; // 本金(公积金)
    interest: number; // 利息(公积金)
    yearBusinessHuanKuan: number; // 年总还款(商业)
    yearBusinessPrincipal: number; // 本金(商业)
    yearBusinessInterest: number; // 利息(商业)
  }[]>([])

  // 参加工作时间
  const [goWork, setGoWork] = useState(2012)

  // 出生年份
  const [born, setBorn] = useState(1990)

  // 每年理财投入
  const [income, setIncome] = useState(12)

  // 投资预计年利率
  const [rate, setRate] = useState(0.05)

  // 计算至哪一年 
  const [toYear, setToYear] = useState(2055)

  // 贷款开始年
  const [loanStartYear, setLoanStartYear] = useState(2020)

  // 公积金贷款金额
  const [loanAmount, setLoanAmount] = useState(100)

  // 公积金贷款年利率
  const [loanRate, setLoanRate] = useState(0.0285)

  // 商业贷款金额
  const [loanBusinessAmount, setLoanBusinessAmount] = useState(100)

  // 商业贷款年利率
  const [loanBusinessRate, setLoanBusinessRate] = useState(0.0345)

  // 贷款方式
  const [loanType, setLoanType] = useState(1)

  // 贷款年限
  const [loanYear, setLoanYear] = useState(20)

  // 公积金总还款金额
  const [totalPayment, setTotalPayment] = useState(0)

  // 商业贷款总还款金额
  const [totalPaymentBusiness, setTotalPaymentBusiness] = useState(0)

  // 公积金月还款额
  const [monthPayment, setMonthPayment] = useState(0)

  // 商业贷款月还款额
  const [monthPaymentBusiness, setMonthPaymentBusiness] = useState(0)

  // 首付款
  const [firstPayment, setFirstPayment] = useState(50)

  const paramsList: { name: string; value: number; setValue: (value: number) => void }[] = [
    { name: '参加工作时间', value: goWork, setValue: setGoWork },
    { name: '出生年份', value: born, setValue: setBorn },
    { name: '每年理财投入', value: income, setValue: setIncome },
    { name: '投资预计年利率', value: rate, setValue: setRate },
    { name: '计算至哪一年', value: toYear, setValue: setToYear },
    { name: '房贷开始年', value: loanStartYear, setValue: setLoanStartYear },
    { name: '首付款', value: firstPayment, setValue: setFirstPayment },
    { name: '公积金贷款金额', value: loanAmount, setValue: setLoanAmount },
    { name: '公积金贷款年利率', value: loanRate, setValue: setLoanRate },
    { name: '商业贷款金额', value: loanBusinessAmount, setValue: setLoanBusinessAmount },
    { name: '商业贷款年利率', value: loanBusinessRate, setValue: setLoanBusinessRate },
    { name: '贷款方式(1: 等额本息; 2: 等额本金)', value: loanType, setValue: setLoanType },
    { name: '贷款年限', value: loanYear, setValue: setLoanYear },
  ]

  // 循环计算当前年份总资产
  const getTotal = (year: number) => {
    let total = 0
    let lastTotal = 0
    for (let j = goWork; j < year; j++) {
      const ly = calculateInterest(lastTotal)
      total = lastTotal + ly + income

      if (j >= loanStartYear && j < loanStartYear + loanYear) {
        const calculateFun = loanType === 1 ? calculateEqualInterest : calculateEqualPrincipal
        const yearHuanKuan = calculateFun(loanAmount, loanYear, loanRate, j, 1).yearHuanKuan
        const yearBusinessHuanKuan = calculateFun(loanBusinessAmount, loanYear, loanBusinessRate, j, 2).yearHuanKuan
        total = total - yearHuanKuan - yearBusinessHuanKuan
      }
      if (j === loanStartYear) {
        total = total - firstPayment
      }
      lastTotal = total
    }

    return total
  }

  // 计算利息
  const calculateInterest = (data: number) => {
    return data * rate
  }

  // 计算利息总收益
  const getAllLi = (i: number) => {
    let total = 0
    for (let j = goWork; j < i; j++) {
      const ly = calculateInterest(getTotal(j))
      total = ly + total
    }

    return total
  }

  const init = () => {
    let data = []
    const calculateFun = loanType === 1 ? calculateEqualInterest : calculateEqualPrincipal
    for (let year = goWork; year < toYear + 1; year++) {
      data.push({
        year,
        age: year - born + 1, // 虚岁加1
        putTotal: (year - goWork + 1) * income,
        total: getTotal(year + 1),
        lastyearMy: calculateInterest(getTotal(year)),
        allLi: getAllLi(year + 1),
        yearHuanKuan: calculateFun(loanAmount, loanYear, loanRate, year, 1).yearHuanKuan,
        principal: calculateFun(loanAmount, loanYear, loanRate, year, 1).principal,
        interest: calculateFun(loanAmount, loanYear, loanRate, year, 1).interest,
        yearBusinessHuanKuan: calculateFun(loanBusinessAmount, loanYear, loanBusinessRate, year, 2).yearHuanKuan,
        yearBusinessPrincipal: calculateFun(loanBusinessAmount, loanYear, loanBusinessRate, year, 2).principal,
        yearBusinessInterest: calculateFun(loanBusinessAmount, loanYear, loanBusinessRate, year, 2).interest,
      })
    }
    setTableData(data)
  }

  // 等额本息
  const calculateEqualInterest = (loanAmountParams: number, loanYearParams: number, loanRateParams: number, year: number, type: number) => {
    const months = loanYearParams * 12;
    const monthlyInterest = loanRateParams / 12;
    const x = Math.pow(1 + monthlyInterest, months);
    // 月还款额
    const monthly = (loanAmountParams * x * monthlyInterest) / (x - 1);
    let yearPrincipalTotal = 0;
    let yearInterestTotal = 0;
    // 计算本金利息各多少
    for (let month = 1; month <= 12; month++) {
      const currentMonth = (year - loanStartYear - 1) * 12 + month;
      const remainingPrincipal = loanAmountParams * (Math.pow(1 + monthlyInterest, months) - Math.pow(1 + monthlyInterest, currentMonth)) / (Math.pow(1 + monthlyInterest, months) - 1);
      const interestForMonth = remainingPrincipal * monthlyInterest;
      const principalForMonth = monthly - interestForMonth;
      yearPrincipalTotal += principalForMonth;
      yearInterestTotal += interestForMonth;
    }
    // 总共还款额
    if (type === 1) {
      setTotalPayment(monthly * 12 * loanYearParams);
      setMonthPayment(monthly)

    } else {
      setTotalPaymentBusiness(monthly * 12 * loanYearParams);
      setMonthPaymentBusiness(monthly)
    }

    // 在贷款年限内
    if (year >= loanStartYear && year < loanStartYear + loanYearParams) {
      return {
        principal: yearPrincipalTotal, // 本金
        interest: yearInterestTotal, // 利息
        yearHuanKuan: monthly * 12 // 年还款额
      }
    }
    // 贷款年限外
    return {
      principal: 0,
      interest: 0,
      yearHuanKuan: 0
    }
  };

  // 等额本金
  const calculateEqualPrincipal = (loanAmountParams: number, loanYearParams: number, loanRateParams: number, year: number, type: number) => {
    const months = loanYearParams * 12;
    const monthlyInterest = loanRateParams / 12;
    const monthlyPrincipal = loanAmountParams / months;
    const annualPayments = [];
    let yearTotal = 0;
    let yearPrincipalTotal = 0;
    let yearInterestTotal = 0;

    for (let i = 0; i < months; i++) {
      const interestForMonth = (loanAmountParams - i * monthlyPrincipal) * monthlyInterest;
      const totalForMonth = monthlyPrincipal + interestForMonth;
      yearTotal += totalForMonth;

      if ((i + 1) % 12 === 0) {
        annualPayments.push(yearTotal);
        yearTotal = 0;
      }
    }
    for (let month = 1; month <= 12; month++) {
      const interestForMonth = (loanAmountParams - ((year - loanStartYear) * 12 + month) * monthlyPrincipal) * monthlyInterest;
      const totalForMonth = monthlyPrincipal + interestForMonth;
      yearTotal += totalForMonth;
      yearPrincipalTotal += monthlyPrincipal
      yearInterestTotal += interestForMonth;
    }

    // 总共还款额
    if (type === 1) {
      setTotalPayment(annualPayments.reduce((a, b) => a + b, 0));
    } else {
      setTotalPaymentBusiness(annualPayments.reduce((a, b) => a + b, 0));
    }

    // 在贷款年限内
    if (year >= loanStartYear && year < loanStartYear + loanYearParams) {
      return {
        principal: yearPrincipalTotal, // 本金
        interest: yearInterestTotal, // 利息
        yearHuanKuan: yearTotal // 年还款额
      }
    }

    // 贷款年限外
    return {
      principal: 0,
      interest: 0,
      yearHuanKuan: 0
    }
  };

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <div className="my-10 font-semibold text-xl">日复日，年复年，利滚利，祝老板发财！ 🎉 🎉 🎉</div>
      <div className="grid grid-cols-5 gap-3 text-sm mb-5">
        {paramsList.map((item) =>
          <div key={item.name}>
            <div className="mb-2">{item.name}</div>
            <Input type="number" value={item.value} onChange={(e) => {
              item.setValue(Number(e.target.value))
            }} />
          </div>
        )}
      </div>
      
      <Button className="mb-5 w-32" onClick={init}>计算</Button>

      {totalPayment + totalPaymentBusiness !== 0 && <div className="grid grid-cols-5 gap-3 text-sm mb-5">
        <div>总还款(公积金): {totalPayment.toFixed(2)}</div>
        <div>总还款(商业): {totalPaymentBusiness.toFixed(2)}</div>
        <div>月还款(公积金): {monthPayment.toFixed(2)}</div>
        <div>月还款(商业): {monthPaymentBusiness.toFixed(2)}</div>
        <div>总月还款: {(monthPayment + monthPaymentBusiness).toFixed(2)}</div>
        <div>总还款: {(totalPayment + totalPaymentBusiness).toFixed(2)}</div>
      </div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>年份</TableHead>
            <TableHead>年龄</TableHead>
            <TableHead>实际投入</TableHead>
            <TableHead>上年收益</TableHead>
            <TableHead>总资产</TableHead>
            <TableHead>总收益</TableHead>
            <TableHead>还款(公积金)</TableHead>
            <TableHead>本金(公积金)</TableHead>
            <TableHead>利息(公积金)</TableHead>
            <TableHead>还款(商业)</TableHead>
            <TableHead>本金(商业)</TableHead>
            <TableHead>利息(商业)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(tableData || []).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.putTotal}</TableCell>
              <TableCell>{item.lastyearMy.toFixed(2)}</TableCell>
              <TableCell className="font-bold">{item.total.toFixed(2)}</TableCell>
              <TableCell>{item.allLi.toFixed(2)}</TableCell>
              <TableCell className="font-bold">{item.yearHuanKuan.toFixed(2)}</TableCell>
              <TableCell>{item.principal.toFixed(2)}</TableCell>
              <TableCell>{item.interest.toFixed(2)}</TableCell>
              <TableCell className="font-bold">{item.yearBusinessHuanKuan.toFixed(2)}</TableCell>
              <TableCell>{item.yearBusinessPrincipal.toFixed(2)}</TableCell>
              <TableCell>{item.yearBusinessInterest.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead>年份</TableHead>
            <TableHead>年龄</TableHead>
            <TableHead>实际投入</TableHead>
            <TableHead>上年收益</TableHead>
            <TableHead>总资产</TableHead>
            <TableHead>总收益</TableHead>
            <TableHead>还款(公积金)</TableHead>
            <TableHead>本金(公积金)</TableHead>
            <TableHead>利息(公积金)</TableHead>
            <TableHead>还款(商业)</TableHead>
            <TableHead>本金(商业)</TableHead>
            <TableHead>利息(商业)</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}

export default FinancialManagement