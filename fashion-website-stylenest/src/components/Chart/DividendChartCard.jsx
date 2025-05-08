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

// Mảng ánh xạ tháng tiếng Anh sang tiếng Việt
const monthsInVietnamese = {
  "Jan": "Tháng 1",
  "Feb": "Tháng 2",
  "Mar": "Tháng 3",
  "Apr": "Tháng 4",
  "May": "Tháng 5",
  "Jun": "Tháng 6",
  "Jul": "Tháng 7",
  "Aug": "Tháng 8",
  "Sep": "Tháng 9",
  "Oct": "Tháng 10",
  "Nov": "Tháng 11",
  "Dec": "Tháng 12"
};

// Hàm để format tiền tệ theo kiểu Việt Nam (VND)
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const DividendChartCard = ({ orders }) => {
  // Bước 1: Khởi tạo một đối tượng để chứa doanh thu của mỗi tháng
  const monthlyRevenue = {};

  // Bước 2: Duyệt qua từng đơn hàng và cộng doanh thu vào tháng tương ứng
  orders.forEach((order) => {
    // Tách phần giờ và ngày
    const [time, date] = order.timeline[0].orderDate.split(' ');

    // Tách ngày, tháng, năm
    const [day, month, year] = date.split('/');
    
    // Kiểm tra nếu dữ liệu ngày tháng năm hợp lệ
    if (!day || !month || !year) {
      console.error('Invalid date format:', order.orderDate);
      return;
    }

    // Tạo chuỗi ngày theo định dạng yyyy-mm-dd
    const formattedDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    // Lấy tháng từ chuỗi đã chuyển đổi
    const orderMonth = new Date(formattedDateString).toLocaleString("en-US", { month: "short" });

    // Tính tổng doanh thu từ orderDetails
    const totalRevenue = order.orderDetails.reduce((sum, item) => sum + item.total, 0);

    // Nếu tháng đã có trong đối tượng monthlyRevenue, cộng thêm doanh thu
    if (monthlyRevenue[orderMonth]) {
      monthlyRevenue[orderMonth] += totalRevenue;
    } else {
      // Nếu tháng chưa có trong đối tượng, khởi tạo giá trị
      monthlyRevenue[orderMonth] = totalRevenue;
    }
  });

  // Bước 3: Chuyển đổi đối tượng monthlyRevenue thành mảng dividendData
  const dividendData = Object.keys(monthlyRevenue).map(month => ({
    month,
    value: monthlyRevenue[month]
  }));

  // Sắp xếp mảng dividendData theo thứ tự tháng
  const sortedDividendData = dividendData.sort((a, b) => {
    const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
  });

  console.log(sortedDividendData);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4.5 shadow-sm h-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Lợi nhuận</h2>
      </div>

      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedDividendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c0c0c0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={({ x, y, payload }) => {
                const monthInVietnamese = monthsInVietnamese[payload.value] || payload.value;  // Ánh xạ tháng sang tiếng Việt
                return (
                  <text x={x} y={y} textAnchor="middle" fill="#6b7280" fontSize={12}>
                    {monthInVietnamese}  {/* Hiển thị tháng bằng tiếng Việt */}
                  </text>
                );
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
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "none",
              }}
              itemStyle={{ color: "#4f46e5" }}
              formatter={(value) => [formatCurrency(value), "Lợi nhuận"]}
              labelFormatter={(label) => monthsInVietnamese[label] || label}
              labelStyle={{ color: "#374151", fontWeight: "bold" }}
            />
            <Bar
              dataKey="value"
              fill="url(#colorBar)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DividendChartCard
