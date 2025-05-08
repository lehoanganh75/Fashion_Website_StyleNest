import "boxicons/css/boxicons.min.css";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import RevenueChartCard from "../Chart/RevenueChartCard";
import DividendChartCard from "../Chart/DividendChartCard";
import StockCard from "../StockCard/StockCard";
import WatchlistItem from "../WatchlistItem/WatchlistItem";
import { useData } from "../../contexts/DataContext";
import { useMemo } from "react";

const Dashboard = () => {
  const { orders, products } = useData();

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );
  const totalSoldProducts = orders.reduce((sum, order) => {
    const orderTotal = order.orderDetails?.reduce(
      (subSum, item) => subSum + (item.quantity || 0),
      0
    );
    return sum + orderTotal;
  }, 0);
  

  const formattedRevenue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalRevenue);

  return (
    <div className="w-full bg-gray-50 font-['Roboto']">
      <div className="p-4">
        {/* Stock Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <StockCard
            symbol="Đơn hàng"
            name="Tổng số"
            price={totalOrders.toString()}
            change={100} // hoặc để trống nếu không cần
            logo="/imgs/phatrien.png"
          />

          <StockCard
            symbol="Sản phẩm bán ra"
            name="Tổng số"
            price={totalSoldProducts.toString()}
            change={100} // hoặc tạm thời bỏ qua
            logo="/imgs/product.png"
          />

          <StockCard
            symbol="Doanh thu"
            name="Tổng cộng"
            price={formattedRevenue}
            change={100} // nếu không cần % thay đổi
            logo="/imgs/phatrien.png"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Portfolio Performance */}
          <RevenueChartCard orders={orders} />

          <div className="flex flex-col gap-4 w-full">
            {/* Dividend */}
            <DividendChartCard orders={orders} />

            {/* Watchlist */}
            <div className="lg:col-span-3 bg-white border border-gray-300 rounded-lg p-4.5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  My Watchlist
                </h2>
              </div>

              <div className="space-y-4">
                <WatchlistItem
                  symbol="Đơn hàng"
                  name="Trong 24 giờ qua"
                  price={totalOrders.toString()}
                  change={100} // hoặc để trống nếu không cần
                  logo="/imgs/phatrien.png"
                />
                <WatchlistItem
                  symbol="Lợi nhuận"
                  name="Tháng này"
                  price={formattedRevenue}
                  change={100} // nếu không cần % thay đổi
                  logo="/imgs/phatrien.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <TransactionsTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
