"use client"

import { useState, useEffect } from "react"
import CanvasChart from "./CanvasChart"
import PeriodSelector from "./PeriodSelector"

const StatisticsChart = () => {
  const [period, setPeriod] = useState("Monthly")
  const [chartData, setChartData] = useState({
    upperLine: [],
    lowerLine: [],
    labels: [],
  })

  // Sample data for different periods
  const allData = {
    Monthly: {
      upperLine: [180, 190, 170, 160, 175, 165, 170, 200, 225, 210, 235, 230],
      lowerLine: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    Quarterly: {
      upperLine: [180, 165, 200, 230],
      lowerLine: [40, 45, 90, 140],
      labels: ["Q1", "Q2", "Q3", "Q4"],
    },
    Annually: {
      upperLine: [190, 210, 230, 245, 260],
      lowerLine: [40, 60, 100, 130, 150],
      labels: ["2020", "2021", "2022", "2023", "2024"],
    },
  }

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod)
  }

  // Update chart data when period changes
  useEffect(() => {
    setChartData(allData[period])
  }, [period])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
          <p className="text-gray-500">Target vs Actual performance</p>
        </div>
        <PeriodSelector activePeriod={period} onPeriodChange={handlePeriodChange} />
      </div>
      <div className="w-full h-[400px] mt-6">
        <CanvasChart data={chartData} period={period} />
      </div>
    </div>
  )
}

export default StatisticsChart
