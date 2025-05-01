const ProductBadge = ({ type, value }) => {
    if (type === "discount" && value) {
        return <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">{value.toFixed(0)} %</div>
    }

    if (type === "new") {
        return <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">New</div>
    }

    return null
}

export default ProductBadge