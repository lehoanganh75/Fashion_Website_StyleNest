import React from 'react'
import TransactionsTableCustomer from "../TransactionsTable/TransactionsTableCustomer"
import { useData } from '../../contexts/DataContext'

const Customer = () => {
  const { customers } = useData();

  return (
    <div className="p-4 w-full">
    <TransactionsTableCustomer customers={customers}/>
  </div>
  )
}

export default Customer
