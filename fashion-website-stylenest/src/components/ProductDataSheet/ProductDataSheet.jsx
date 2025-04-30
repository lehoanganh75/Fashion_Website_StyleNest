const ProductDataSheet = ({ specifications }) => {
    return (
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Data sheet</h3>
            {specifications.logo && (
              <div className="border border-gray-200 rounded p-3 bg-white absolute top-3 right-3">
                <img src={specifications.logo || "/placeholder.svg"} alt="Brand logo" className="h-24 w-24" />
              </div>
            )}
          </div>
  
          <div className="mt-2 grid grid-cols-1 text-sm">
            {specifications.reference && (
              <div className="flex py-2">
                <span className="font-medium w-24">Reference</span>
                <span className="text-gray-600">{specifications.reference}</span>
              </div>
            )}
  
            {specifications.condition && (
              <div className="flex py-2">
                <span className="font-medium w-24">Condition</span>
                <span className="text-gray-600">{specifications.condition}</span>
              </div>
            )}
  
            {specifications.stock && (
              <div className="flex py-2">
                <span className="font-medium w-24">In stock</span>
                <span className="text-green-500">{specifications.stock} items</span>
              </div>
            )}
          </div>
        </div>
  
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {specifications.details &&
                Object.entries(specifications.details).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap bg-gray-100 w-1/3">
                      <div className="text-sm font-medium">{key}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{value}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default ProductDataSheet
  