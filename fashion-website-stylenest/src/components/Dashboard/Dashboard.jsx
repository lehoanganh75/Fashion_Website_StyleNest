import "boxicons/css/boxicons.min.css";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import RevenueChartCard from "../Chart/RevenueChartCard";
import DividendChartCard from "../Chart/DividendChartCard";
import StockCard from "../StockCard/StockCard";
import WatchlistItem from "../WatchlistItem/WatchlistItem";
import { useData } from "../../contexts/DataContext";

const Dashboard = () => {
  const { orders } = useData();

  return (
    <div className="w-full bg-gray-50 font-['Roboto']">
      <div className="p-4">
        {/* Stock Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <StockCard
            symbol="Doanh thu"
            name="Trong 7 ngày qua"
            price="1,781,000 VNĐ"
            change={11.01}
            logo="/imgs/phatrien.png"
          />
          <StockCard
            symbol="Sản phẩm"
            name="Tổng số"
            price="1,250" // Example total product count
            change={-2.5} // Example percentage change
            logo="/imgs/product.png"
          />
          <StockCard
            symbol="Đơn hàng"
            name="Trong 7 ngày qua"
            price="345" // Example order count
            change={5.3} // Example percentage change
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
                  price="155"
                  change={8.2}
                  logo="/imgs/phatrien.png"
                />
                <WatchlistItem
                  symbol="Lợi nhuận"
                  name="Tháng này"
                  price="560,000 VNĐ"
                  change={15.5}
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
