import React from 'react'
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const StockCard = ({ symbol, name, price, change, logo }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4.5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
            <img src={logo || "/placeholder.svg"} alt={`${name} logo`} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{symbol}</h3>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-gray-800">{price}</h4>
        <p className={`text-sm ${change > 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
            {change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(change)}%
        </p>
      </div>
    </div>
  )
}

export default StockCard
