const ProductDataSheet = ({ product }) => {
  const keyTranslations = {
    fabric: "Chất liệu",
    composition: "Thành phần",
    origin: "Xuất xứ",
    careInstructions: "Hướng dẫn bảo quản"
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Bảng dữ liệu</h3>
          {product.thumbnails[0] && (
            <div className="border border-gray-200 rounded p-2 bg-white absolute top-3 right-3">
              <img src={product.thumbnails[0] || "/placeholder.svg"} alt="Brand logo" className="h-20 w-20" />
            </div>
          )}
        </div>

        <div className="mt-2 grid grid-cols-1 text-sm">
          {product.condition && (
            <div className="flex py-2">
              <span className="font-medium w-30">Tình trạng</span>
              <span className="text-gray-600">{product.condition ? "New" : ""}</span>
            </div>
          )}

          {product.inStock && (
            <div className="flex py-2">
              <span className="font-medium w-30">Trong cửa hàng</span>
              <span className="text-green-500">{product.inStock} sản phẩm</span>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {product.details &&
              Object.entries(product.details).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap bg-gray-100 w-1/3">
                    <div className="text-sm font-medium">
                      {keyTranslations[key] || key}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal break-words">
                    <div className="text-sm text-gray-900">
                      {value}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductDataSheet;
  