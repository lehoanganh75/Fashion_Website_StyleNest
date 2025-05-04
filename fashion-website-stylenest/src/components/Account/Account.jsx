import React from 'react'
import TransactionsTableAccount from "../TransactionsTable/TransactionsTableAccount"
import { useData } from '../../contexts/DataContext';

const Account = () => {
  const { accounts } = useData();

  return (
    <div className="p-4 w-full">
      <TransactionsTableAccount accounts={accounts}/>
    </div>
  )
}

export default Account
