import React from 'react';
import { Trash2 } from "lucide-react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex items-center gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] space-y-6">
            {/* Hình ảnh sản phẩm */}
            <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="h-full w-full object-cover"
                />
            </div>

            {/* Nội dung sản phẩm */}
            <div className="flex-1">
                <h4 className="font-semibold text-base text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
            </div>

            {/* Điều chỉnh số lượng, giá và nút xoá */}
            <div className="flex items-center gap-4">
                {/* Nút tăng giảm số lượng */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    −
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    +
                </button>
                </div>

                {/* Giá */}
                <div className="w-36 text-right font-semibold text-gray-800">
                    {item.price} VNĐ
                </div>

                {/* Nút xoá */}
                <button
                className="text-gray-400 hover:text-red-500"
                onClick={() => removeItem(item.id)}
                >
                <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
