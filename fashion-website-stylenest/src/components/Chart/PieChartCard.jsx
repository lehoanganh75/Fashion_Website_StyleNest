import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChartCard = ({ data }) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ff6347', '#ffbb33', '#ff00ff'];

  // Tính tổng value
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Hàm hiển thị nhãn: giá trị và phần trăm
  const renderCustomizedLabel = ({ value }) => {
    const percent = (value / total) * 100;
    return `${percent.toFixed(1)}%`;
  };

  return (
    <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg p-4 shadow-sm" style={{ width: '100%', height: '400px' }}>
      <PieChart width={380} height={380}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          innerRadius={80}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{
                filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))',
              }}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, name]} />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </div>
  );
};

export default PieChartCard;
