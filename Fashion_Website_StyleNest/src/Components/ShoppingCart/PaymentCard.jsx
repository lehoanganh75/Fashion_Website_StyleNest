import React from 'react'
import { ArrowRight } from "lucide-react"

const PaymentCard = ({ subtotal, shipping, total }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Card Details</h2>
                <div className="h-10 w-10 rounded-full overflow-hidden border border-white/20">
                    <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="h-full w-full object-cover" />
                </div>
            </div>

            {/* Card type */}
            <div>
                <p className="mb-2 text-sm">Loại thẻ</p>
                <div className="flex gap-3">
                    {["MasterCard", "VISA", "RuPay"].map((type) => (
                    <div
                        key={type}
                        className="bg-white rounded-lg shadow-sm p-2 w-16 h-12 flex items-center justify-center"
                    >
                        <img
                        src={`/placeholder.svg?height=30&width=40&text=${type}`}
                        alt={type}
                        className="max-h-full object-contain"
                        />
                    </div>
                    ))}
                    <button className="px-3 rounded-lg bg-white shadow-sm hover:shadow-md text-sm text-gray-800">
                    See all
                    </button>
                </div>
            </div>

            {/* Card name */}
            <div>
                <p className="mb-2 text-sm">Tên trên thẻ</p>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 rounded-lg bg-white shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
            </div>

            {/* Card number */}
            <div>
                <p className="mb-2 text-sm">Số thẻ</p>
                <input
                    type="text"
                    placeholder="1111 2222 3333 4444"
                    className="w-full p-3 rounded-lg bg-white shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
            </div>

            {/* Expiration & CVV */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <p className="mb-2 text-sm">Ngày hết hạn</p>
                    <input
                    type="date"
                    placeholder="MM/YY"
                    className="w-full p-3 rounded-lg bg-white shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    />
                </div>
                <div className="flex-1">
                    <p className="mb-2 text-sm">CVV</p>
                    <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 rounded-lg bg-white shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-2 border-t border-white/20 pt-4 text-sm">
                <div className="flex justify-between">
                    <span>Tồng tiền</span>
                    <span>{subtotal} VNĐ</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{shipping} VNĐ</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Tổng cộng (Đã bao gồm thuế)</span>
                    <span>{total} VNĐ</span>
                </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full h-14 mt-2 bg-teal-400 hover:bg-teal-500 text-white text-lg font-medium rounded-lg flex items-center justify-between px-4 transition">
                <span>{total} VNĐ</span>
                <div className="flex items-center">
                    Thanh toán
                    <ArrowRight className="ml-2 h-5 w-5" />
                </div>
            </button>
        </div>
    );
};

export default PaymentCard;
