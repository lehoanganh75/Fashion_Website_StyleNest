import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const DividendChartCard = ({ dividendData }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4.5 shadow-sm h-auto">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Lợi nhuận</h2>
    </div>

    <div className="h-50">
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dividendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c0c0c0" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} width={40} />
        <Tooltip
            contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "none",
            }}
            formatter={(value) => [`$${value}`, "Dividend"]}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
        />
        <Bar
            dataKey="value"
            fill="url(#colorBar)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
        />
        </BarChart>
    </ResponsiveContainer>
    </div>
</div>
  )
}

export default DividendChartCard
