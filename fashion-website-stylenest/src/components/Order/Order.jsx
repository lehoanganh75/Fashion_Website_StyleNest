import React from 'react'
import TransactionsTableOrder from "../TransactionsTable/TransactionsTableOrder"
import { useData } from '../../contexts/DataContext'

const Order = () => {
  const { orders } = useData();

  return (
    <div className="p-4 w-full">
      <TransactionsTableOrder orders={orders}/>
    </div>
  )
}

export default Order
