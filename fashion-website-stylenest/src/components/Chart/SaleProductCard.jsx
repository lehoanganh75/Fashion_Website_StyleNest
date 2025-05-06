import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Hàm format tiền tệ kiểu Việt Nam
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

const SaleProductCard = ({ orders }) => {
  const bestSellingProducts = {};

  // Tổng hợp dữ liệu
  orders.forEach(order => {
    order.orderDetails.forEach(item => {
      if (bestSellingProducts[item.productName]) {
        bestSellingProducts[item.productName].quantity += item.quantity;
        bestSellingProducts[item.productName].revenue += item.total;
      } else {
        bestSellingProducts[item.productName] = {
          quantity: item.quantity,
          revenue: item.total,
        };
      }
    });
  });

  const bestSellingData = Object.keys(bestSellingProducts).map(productName => ({
    name: productName,
    quantity: bestSellingProducts[productName].quantity,
    revenue: bestSellingProducts[productName].revenue,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md font-['Roboto']">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-xl font-semibold text-gray-800">Sản phẩm bán chạy</h2>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bestSellingData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-15}
              textAnchor="end"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              allowDecimals={false}
              label={{
                value: "Số lượng",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
                fontSize: 14,
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'quantity') return [`${value} sản phẩm`, "Số lượng"];
                if (name === 'revenue') return [formatCurrency(value), "Doanh thu"];
                return value;
              }}
              labelStyle={{ color: "#374151", fontWeight: "bold" }}
              itemStyle={{ color: "#4f46e5" }}
            />
            <Bar
              dataKey="quantity"
              fill="url(#colorBar)"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SaleProductCard;