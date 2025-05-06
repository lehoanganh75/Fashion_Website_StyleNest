import React from 'react'
import DividendChartCard from '../Chart/DividendChartCard'
import SaleProductCard from '../Chart/SaleProductCard'
import RevenueChartCard from '../Chart/RevenueChartCard'
import { useData } from '../../contexts/DataContext'


const ReportChart  = () => {
  const { orders } = useData();

  return (
    <div>
      <div className="p-4 w-full flex gap-4">
        <div className="w-2/3">
          <RevenueChartCard orders={orders} />
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          <DividendChartCard orders={orders} />
        </div>
      </div>
      <div className='px-4 pb-4'>
        <SaleProductCard orders={orders} />
      </div>
    </div>
  );  
}

export default ReportChart 
