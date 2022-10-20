import Head from 'next/head'
import { useState } from "react"

const nums = [7,8,9,4,5,6,1,2,3,0]
const operators = ["/", "*", "-", "+"]

export default function Home() {
	const [ calc, setCalc ] = useState("")
	const [ result, setResult ] = useState(0)
	const [ sign, setSign ] = useState("")
  
  const handleNumber = (e) => {
		if (sign === "=") {
      setCalc("")
			setResult(0)
			setSign("")
		}
		if (calc.length<1 && e.target.value==="0") return
		setCalc(prev => prev+e.target.value)
		setResult(prev => !prev ? e.target.value : prev+e.target.value)
	}
	const handleDot = () => {
		if (result.toString().includes(".")) return
		setCalc(prev => {
			let val = "."
			operators.map(op => {
				if (!calc || calc.endsWith(op)) val="0."
			})
      return prev.toString().concat(val)
		})
    setResult(prev => prev.toString().concat("."))
	}
  const handleOperation = (e) => {
    if (!calc) return
		setSign(e.target.value)
		setResult(0)
		operators.map(op => {
			if (calc.endsWith(op)) {
				setCalc(prev => prev.slice(0, -1))
			}
		})
		setCalc(prev => prev+e.target.value)
	}
  const getAnswer = () => {
		operators.map(op => {
			if (calc.endsWith(op)) {
				setCalc(prev => prev.slice(0, -1))
			}
		})
		setResult(eval(calc))
		setSign("=")
	}
	
  const clearAll = () => {
		setCalc("")
		setResult(0)
		setSign("")
	}
	const calcPercent = () => {
    if (!calc) return
		setCalc(prev => prev+"/100")
    getAnswer()
	}
	const calcBack = () => {
		if (!calc) return
		setCalc(prev => prev.slice(0, -1))
		setResult(prev => {
			const val = prev.toString().slice(0, -1)
			if (!val) return 0
      return val
		})
	}
	
  return (
    <div>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="A fully optimized Calculator app developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen flex items-center">
        <div className="calc_container mx-auto w-[450px] p-4 flex flex-col rounded-lg border">
					<div className="result h-64 flex flex-col justify-end items-end text-right py-4">
						<span className="text-3xl text-gray-400 w-full overflow-x-auto">{calc}</span>
						<span className="text-3xl text-gray-400">{sign}</span>
            <span className="text-8xl w-full overflow-x-auto">{result}</span>
					</div>
					
					<div className="w-full flex">
						<div className="w-3/4 grid grid-cols-3 gap-2">
			        <button onClick={clearAll} className="bg-[#a5a5a5] text-slate-900">AC</button>
							<button onClick={calcBack} className="bg-[#a5a5a5] text-slate-900">⌫</button>
							<button onClick={calcPercent} className="bg-[#a5a5a5] text-slate-900">%</button>
							
              {nums.map(num => (
			          <button key={num} onClick={handleNumber} value={num} className={`bg-[#343434] ${num===0 ? "col-span-2" : ""}`}>{num}</button>
							))}
							<button onClick={handleDot} className="bg-[#343434]">.</button>
						</div>
						<div className="w-1/4 flex flex-col gap-2 pl-2">
							{operators.map(operator => (
			          <button key={operator} onClick={handleOperation} value={operator} className="bg-[#ff9f0a]">{operator}</button>
							))}
							<button onClick={getAnswer} className="bg-[#ff9f0a]">=</button>
						</div>
					</div>
					
				</div>
      </main>
    </div>
  )
}
