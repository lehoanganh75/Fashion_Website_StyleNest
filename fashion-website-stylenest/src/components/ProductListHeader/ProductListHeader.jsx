import { useState } from "react";
import { Grid, List, ChevronDown } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ProductListHeader = ({ totalProducts, onViewChange, onSortChange }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleViewChange = (mode) => {
    setViewMode(mode);
    if (onViewChange) onViewChange(mode);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    if (onSortChange) onSortChange(option);

    // Preserve the search term when sorting
    const currentSearchTerm = searchParams.get('name');
    const newSearchParams = new URLSearchParams();
    if (currentSearchTerm) {
      newSearchParams.set('name', currentSearchTerm);
    }
    newSearchParams.set('sortBy', option);
    navigate(`/product?${newSearchParams.toString()}`);
  };

  const sortOptions = [
    { value: "relevance", label: "Có liên quan" },
    { value: "price-low", label: "Giá: Từ thấp đến cao" },
    { value: "price-high", label: "Giá: Từ cao đến thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ];

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          onClick={() => handleViewChange("grid")}
          aria-label="Grid view"
        >
          <Grid size={20} className="text-gray-600" />
        </button>
        <button
          className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          onClick={() => handleViewChange("list")}
          aria-label="List view"
        >
          <List size={20} className="text-gray-600" />
        </button>
        <span className="ml-4 text-gray-700">Có {totalProducts} sản phẩm.</span>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sắp xếp theo:</span>
          <button
            className="px-3 py-2 border border-gray-300 rounded-md flex items-center gap-2 min-w-[160px] justify-between hover:border-gray-400 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{sortOptions.find((opt) => opt.value === sortOption)?.label}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="py-1" role="listbox">
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${sortOption === option.value ? "bg-gray-100" : ""}`}
                  onClick={() => handleSortChange(option.value)}
                  role="option"
                  aria-selected={sortOption === option.value}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListHeader;