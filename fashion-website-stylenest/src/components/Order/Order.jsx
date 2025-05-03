import React from 'react'
import TransactionsTableOrder from "../TransactionsTable/TransactionsTableOrder"
import data from "../../data/order.json"

const Order = () => {
  return (
    <div className="p-4 w-full">
    <TransactionsTableOrder orders={data}/>
  </div>
  )
}

export default Order
