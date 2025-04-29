import React, { useState } from 'react'
import { ChevronLeft } from "lucide-react"
import CartItem from './CartItem'
import PaymentCard from './PaymentCard'

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Italy Pizza",
      description: "Extra cheese and topping",
      price: 681,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Combo Plate",
      description: "Extra cheese and topping",
      price: 681,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Spanish Rice",
      description: "Extra garlic",
      price: 681,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 4
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white font-sans cursor-pointer">
        <div className="max-w mx-auto p-6 lg:px-30 lg:pt-10 lg:pb-4 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Cart */}
                <div className="w-full lg:w-4/6 space-y-6">
                    <div className="flex items-center gap-2 text-gray-600 border-b-1 border-gray-200 pb-4">
                        <ChevronLeft className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Tiếp tục mua sắm</h2>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-2xl font-semibold mb-1">Giỏ hàng</h3>
                        <p className="text-sm text-gray-500">
                            Bạn có {cartItems.length} sản phẩm trong giỏ hàng của bạn
                        </p>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQuantity={updateQuantity}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Payment */}
                <div className="w-full lg:w-2/6">
                    <PaymentCard subtotal={subtotal} shipping={shipping} total={total} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShoppingCart;
