import { useState, useEffect } from "react"

const FilterSidebar = ({ onFilterChange }) => {
    // Filter states
    const [availability, setAvailability] = useState([])
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [priceRange, setPriceRange] = useState([37, 94])
    const [brands, setBrands] = useState([])
    const [conditions, setConditions] = useState([])
    const [dimensions, setDimensions] = useState([])

    // Update filters when any state changes
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({
            availability,
            sizes,
            colors,
            priceRange,
            brands,
            conditions,
            dimensions,
            })
        }
    }, [availability, sizes, colors, priceRange, brands, conditions, dimensions, onFilterChange])

    // Toggle filter selection
    const toggleFilter = (filter, value, setter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
    }

    // Color mapping
    const colorMap = {
        grey: "bg-gray-400",
        red: "bg-red-500",
        black: "bg-black",
        orange: "bg-orange-400",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-400",
        pink: "bg-pink-400",
    }

    return (
    <div className="border border-gray-200 rounded-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium text-gray-800">Filter By</h3>
        </div>

        {/* Availability */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Availability</h4>
        <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("availability", "available", setAvailability)}
                checked={availability.includes("available")}
            />
            <span className="text-gray-700">Available</span>
            <span className="text-gray-500 text-sm ml-auto">(17)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("availability", "inStock", setAvailability)}
                checked={availability.includes("inStock")}
            />
            <span className="text-gray-700">In Stock</span>
            <span className="text-gray-500 text-sm ml-auto">(17)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("availability", "notAvailable", setAvailability)}
                checked={availability.includes("notAvailable")}
            />
            <span className="text-gray-700">Not Available</span>
            <span className="text-gray-500 text-sm ml-auto">(1)</span>
            </label>
        </div>
        </div>

        {/* Size */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Size</h4>
        <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("size", "small", setSizes)}
                checked={sizes.includes("small")}
            />
            <span className="text-gray-700">Small</span>
            <span className="text-gray-500 text-sm ml-auto">(6)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("size", "medium", setSizes)}
                checked={sizes.includes("medium")}
            />
            <span className="text-gray-700">Medium</span>
            <span className="text-gray-500 text-sm ml-auto">(5)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("size", "large", setSizes)}
                checked={sizes.includes("large")}
            />
            <span className="text-gray-700">Large</span>
            <span className="text-gray-500 text-sm ml-auto">(7)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("size", "xl", setSizes)}
                checked={sizes.includes("xl")}
            />
            <span className="text-gray-700">XL</span>
            <span className="text-gray-500 text-sm ml-auto">(1)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("size", "xxl", setSizes)}
                checked={sizes.includes("xxl")}
            />
            <span className="text-gray-700">XXL</span>
            <span className="text-gray-500 text-sm ml-auto">(3)</span>
            </label>
        </div>
        </div>

        {/* Color */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Color</h4>
        <div className="space-y-2">
            {[
            { name: "grey", count: 4 },
            { name: "red", count: 3 },
            { name: "black", count: 3 },
            { name: "orange", count: 4 },
            { name: "blue", count: 5 },
            { name: "green", count: 3 },
            { name: "yellow", count: 3 },
            { name: "pink", count: 2 },
            ].map((color) => (
            <label key={color.name} className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("color", color.name, setColors)}
                checked={colors.includes(color.name)}
                />
                <span className={`w-4 h-4 rounded-full ${colorMap[color.name]}`}></span>
                <span className="text-gray-700 capitalize">{color.name}</span>
                <span className="text-gray-500 text-sm ml-auto">({color.count})</span>
            </label>
            ))}
        </div>
        </div>

        {/* Price */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Price</h4>
        <div className="mb-2">
            <span className="text-gray-700">
            ${priceRange[0]}.00 - ${priceRange[1]}.00
            </span>
        </div>
        <input
            type="range"
            min="37"
            max="94"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F44B87FF]"
        />
        </div>

        {/* Brand */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Brand</h4>
        <div className="space-y-2">
            {[
            { name: "Gadget Zone", count: 2 },
            { name: "Initech space", count: 3 },
            { name: "Looney Tunes", count: 2 },
            { name: "Massive Dynamic", count: 2 },
            { name: "Pro Tech Gear", count: 2 },
            { name: "Soylent Green", count: 3 },
            { name: "The Simpsons", count: 3 },
            { name: "Weeds Capital", count: 2 },
            ].map((brand) => (
            <label key={brand.name} className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("brand", brand.name, setBrands)}
                checked={brands.includes(brand.name)}
                />
                <span className="text-gray-700">{brand.name}</span>
                <span className="text-gray-500 text-sm ml-auto">({brand.count})</span>
            </label>
            ))}
        </div>
        </div>

        {/* Condition */}
        <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Condition</h4>
        <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("condition", "new", setConditions)}
                checked={conditions.includes("new")}
            />
            <span className="text-gray-700">New</span>
            <span className="text-gray-500 text-sm ml-auto">(9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("condition", "refurbished", setConditions)}
                checked={conditions.includes("refurbished")}
            />
            <span className="text-gray-700">Refurbished</span>
            <span className="text-gray-500 text-sm ml-auto">(5)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                onChange={() => toggleFilter("condition", "used", setConditions)}
                checked={conditions.includes("used")}
            />
            <span className="text-gray-700">Used</span>
            <span className="text-gray-500 text-sm ml-auto">(6)</span>
            </label>
        </div>
        </div>

        {/* Dimension */}
        <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">Dimension</h4>
            <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                    onChange={() => toggleFilter("dimension", "60x90cm", setDimensions)}
                    checked={dimensions.includes("60x90cm")}
                />
                <span className="text-gray-700">60x90cm</span>
                <span className="text-gray-500 text-sm ml-auto">(3)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#F44B87FF] focus:ring-[#F44B87FF]"
                    onChange={() => toggleFilter("dimension", "70x40cm", setDimensions)}
                    checked={dimensions.includes("70x40cm")}
                />
                <span className="text-gray-700">70x40cm</span>
                <span className="text-gray-500 text-sm ml-auto">(2)</span>
                </label>
            </div>
        </div>
    </div>
    )
}

export default FilterSidebar
