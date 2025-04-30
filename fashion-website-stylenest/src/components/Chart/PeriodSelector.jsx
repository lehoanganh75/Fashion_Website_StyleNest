const PeriodSelector = ({ activePeriod, onPeriodChange }) => {
  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
      <button
        className={`px-4 py-1 rounded-md ${activePeriod === "Monthly" ? "bg-white shadow-sm" : ""}`}
        onClick={() => onPeriodChange("Monthly")}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-1 rounded-md ${activePeriod === "Quarterly" ? "bg-white shadow-sm" : ""}`}
        onClick={() => onPeriodChange("Quarterly")}
      >
        Quarterly
      </button>
      <button
        className={`px-4 py-1 rounded-md ${activePeriod === "Annually" ? "bg-white shadow-sm" : ""}`}
        onClick={() => onPeriodChange("Annually")}
      >
        Annually
      </button>
    </div>
  )
}

export default PeriodSelector
