import React from 'react'
import TransactionsTableProduct from "../TransactionsTable/TransactionsTableProduct"
import data from "../../data/data.json"

const ProductTable = () => {
  return (
    <div className="p-4 w-full">
      <TransactionsTableProduct products={data}/>
    </div>
  )
}

export default ProductTable
