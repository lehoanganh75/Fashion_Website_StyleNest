import { useState } from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts"

const RevenueChartCard = ({ orders }) => {
  const [timePeriod, setTimePeriod] = useState("monthly");

  // Hàm chuyển ngày
  const parseDate = (str) => new Date(str);

  // Hàm tổng hợp theo một khóa (ngày, tháng, năm)
  const aggregateBy = (orders, getKey) => {
      const map = {};
      orders.forEach(order => {
          const key = getKey(parseDate(order.orderDate));
          map[key] = (map[key] || 0) + order.total;
      });

      return Object.entries(map).map(([date, value]) => ({ date, value }));
  };

  const monthlyData = aggregateBy(orders, (date) => `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`);
  const quarterlyData = aggregateBy(orders, (date) => {
      const month = date.getMonth(); // 0 - 11
      const quarter = Math.floor(month / 3) + 1; // 1 - 4
      const year = date.getFullYear();
      return `Q${quarter} ${year}`;
  });
  const annualData = aggregateBy(orders, (date) => String(date.getFullYear()));

  const getChartData = () => {
    const data = timePeriod === "quarterly" ? quarterlyData : timePeriod === "annually" ? annualData : monthlyData;
    
    // Lọc ra 6 tháng gần nhất nếu là thời gian hàng tháng
    if (timePeriod === "monthly") {
      return data.slice(-6); // Lấy 6 tháng gần nhất từ dữ liệu
    }
    
    return data; // Giữ nguyên dữ liệu nếu là hàng quý hoặc hàng năm
  }

  return (
    <div className="lg:col-span-2 border border-gray-300 bg-white rounded-lg p-4.5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-800">Doanh thu tháng này</h2>
            <p className="text-sm text-gray-500 py-2">Đây là số liệu thống kê hiệu suất của bạn mỗi tháng</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${timePeriod === "monthly" ? "bg-white rounded-lg shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setTimePeriod("monthly")}
          >
          Hàng tháng
          </button>
          <button
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${timePeriod === "quarterly" ? "bg-white rounded-lg shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setTimePeriod("quarterly")}
          >
          Hàng qúy
          </button>
          <button
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${timePeriod === "annually" ? "bg-white rounded-lg shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setTimePeriod("annually")}
          >
          Hàng năm
          </button>
        </div>
      </div>

      <div className="h-92">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
          data={getChartData()}
          margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c0c0c0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  ticks={getChartData()
                    .filter((_, i, arr) => i % Math.floor(arr.length / 5) === 0)
                    .map(d => d.date)}
                  tickFormatter={(value) => {
                    if (timePeriod === "monthly") {
                      const date = new Date(value);
                      return date.toLocaleDateString("vi-VN", { day: "numeric", month: "short" }); // VD: 5 Thg 5
                    }
                    return value; // Giữ nguyên "Q1 2025", "2025", v.v.
                  }}
                />
                <YAxis
                  domain={[0, (dataMax) => dataMax * 1.1]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) =>
                    value.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    })
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "none",
                  }}
                  itemStyle={{ color: "#4f46e5" }}
                  formatter={(value) => [
                    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
                    "Doanh thu",
                  ]}
                  labelFormatter={(label) => {
                    if (timePeriod === "monthly") {
                      const date = new Date(label);
                      return date.toLocaleDateString("vi-VN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }
                    return label; // với quarterly và annually
                  }}
                  labelStyle={{ color: "#374151", fontWeight: "bold" }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    fill="url(#colorValue)"
                    fillOpacity={0.2}
                    activeDot={{ r: 6, fill: "#4f46e5", stroke: "white", strokeWidth: 2 }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChartCard;