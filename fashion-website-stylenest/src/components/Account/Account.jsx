import React, { useEffect, useState } from 'react'
import TransactionsTableAccount from "../TransactionsTable/TransactionsTableAccount"
import data from '../../data/account.json';

const Account = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    setAccounts(data);
  })

  return (
    <div className="p-4 w-full">
      <TransactionsTableAccount accounts={accounts}/>
    </div>
  )
}

export default Account
