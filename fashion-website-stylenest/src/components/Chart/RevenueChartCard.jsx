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

  // Hàm chuyển ngày từ định dạng chuỗi
  const parseDate = (str) => {
    if (!str || typeof str !== "string") return new Date(NaN);

    const [time, date] = str.split(" ");
    if (!time || !date) return new Date(NaN);

    const [day, month, year] = date.split("/").map(Number);
    const [hour, minute, second] = time.split(":").map(Number);

    if ([day, month, year, hour, minute, second].some(isNaN)) return new Date(NaN);

    return new Date(year, month - 1, day, hour, minute, second);
  };

  // Hàm tổng hợp theo ngày/tháng/quý/năm
  const aggregateBy = (orders, getKey) => {
    const map = {};
    const timestamps = {};
  
    orders.forEach(order => {
      const rawDate = order.timeline?.[0]?.orderDate;
      if (!rawDate) return; // Bỏ qua nếu không có ngày

      const date = parseDate(rawDate);
      if (isNaN(date.getTime())) return; // Bỏ qua nếu không phải ngày hợp lệ

      const key = getKey(date);
      map[key] = (map[key] || 0) + order.total;
      timestamps[key] = date.getTime();
    });
  
    return Object.entries(map)
      .map(([date, value]) => ({
        date,
        value,
        timestamp: timestamps[date]
      }))
      .sort((a, b) => a.timestamp - b.timestamp); // sắp xếp theo thời gian thực
  };
  

  // Dữ liệu theo tháng
  const monthlyData = aggregateBy(orders, (date) => {
    return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
  });

  // Dữ liệu theo quý
  const quarterlyData = aggregateBy(orders, (date) => {
    const month = date.getMonth();
    const quarter = Math.floor(month / 3) + 1; // Quý 1-4
    return `Q${quarter} ${date.getFullYear()}`;
  });

  // Dữ liệu theo năm
  const annualData = aggregateBy(orders, (date) => `${date.getFullYear()}`);

  // Chọn dữ liệu theo thời gian
  const getChartData = () => {
    const data =
      timePeriod === "quarterly" ? quarterlyData :
      timePeriod === "annually" ? annualData : monthlyData;
  
    if (timePeriod === "monthly") {
      return data.slice(-6); // Giờ đã đúng vì đã sắp xếp theo thời gian
    }
  
    return data;
  }

    const now = new Date();
  const chartData = getChartData().filter(d => {
    const date = new Date(d.date);
    return !isNaN(date) && date <= now;
  });

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
          Hàng quý
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
              ticks={chartData
                .filter((_, i, arr) => i % Math.floor(arr.length / 5 || 1) === 0)
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