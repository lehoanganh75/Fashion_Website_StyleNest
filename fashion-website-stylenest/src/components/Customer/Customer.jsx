import React, { useEffect, useState } from 'react'
import TransactionsTableCustomer from "../TransactionsTable/TransactionsTableCustomer"
import data from '../../data/customers.json';

const Customer = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    setCustomers(data);
  })

  return (
    <div className="p-4 w-full">
    <TransactionsTableCustomer customers={customers}/>
  </div>
  )
}

export default Customer
