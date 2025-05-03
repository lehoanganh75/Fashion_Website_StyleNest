import React from 'react'
import DividendChartCard from '../Chart/DividendChartCard'
import PieChartCard from '../Chart/PieChartCard'
import RevenueChartCard from '../Chart/RevenueChartCard'

const monthlyData = [
  { date: "10 May", value: 31.2 },
  { date: "15 May", value: 31.0 },
  { date: "20 May", value: 32.5 },
  { date: "25 May", value: 33.1 },
  { date: "30 May", value: 32.8 },
  { date: "5 Jun", value: 33.5 },
  { date: "10 Jun", value: 31.9 },
  { date: "15 Jun", value: 33.2 },
  { date: "20 Jun", value: 34.0 },
  { date: "25 Jun", value: 33.8 },
  { date: "30 Jun", value: 34.5 },
  { date: "5 Jul", value: 34.2 },
  { date: "10 Jul", value: 34.8 },
  { date: "15 Jul", value: 35.2 },
]

const quarterlyData = [
  { date: "Jan", value: 28.4 },
  { date: "Feb", value: 29.2 },
  { date: "Mar", value: 30.5 },
  { date: "Apr", value: 31.8 },
  { date: "May", value: 32.9 },
  { date: "Jun", value: 34.2 },
  { date: "Jul", value: 35.1 },
  { date: "Aug", value: 36.3 },
  { date: "Sep", value: 35.8 },
  { date: "Oct", value: 37.2 },
  { date: "Nov", value: 38.5 },
  { date: "Dec", value: 39.7 },
]

const annualData = [
  { date: "2018", value: 25.6 },
  { date: "2019", value: 28.3 },
  { date: "2020", value: 27.4 },
  { date: "2021", value: 32.1 },
  { date: "2022", value: 35.8 },
  { date: "2023", value: 38.2 },
  { date: "2024", value: 39.7 },
]

const dividendData = [
  { month: "Jan", value: 150 },
  { month: "Feb", value: 380 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 280 },
  { month: "May", value: 170 },
  { month: "Jun", value: 180 },
]

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const ReportChart  = () => {
  return (
    <div className="p-4 w-full flex gap-4">
      <div className="w-2/3">
        <RevenueChartCard
          quarterlyData={quarterlyData}
          annualData={annualData}
          monthlyData={monthlyData}
        />
      </div>

      <div className="w-1/3 flex flex-col gap-4">
        <DividendChartCard dividendData={dividendData} />
        <PieChartCard data={data} />
      </div>
    </div>
  );  
}

export default ReportChart 
