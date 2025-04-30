import { useEffect, useRef, useState } from "react"

const CanvasChart = ({ data, period }) => {
  const canvasRef = useRef(null)
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    index: -1,
    upperValue: 0,
    lowerValue: 0,
    label: "",
  })

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set chart dimensions
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Calculate scale
    const maxValue = Math.max(...data.upperLine) * 1.1 // Add 10% padding
    const yScale = chartHeight / maxValue
    const xScale = chartWidth / (data.labels.length - 1)

    // Draw upper line and gradient
    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom - data.upperLine[0] * yScale)

    for (let i = 0; i < data.upperLine.length; i++) {
      const x = padding.left + i * xScale
      const y = height - padding.bottom - data.upperLine[i] * yScale
      ctx.lineTo(x, y)
    }

    // Complete the path to create the gradient area
    ctx.lineTo(padding.left + (data.upperLine.length - 1) * xScale, height - padding.bottom)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()

    // Create gradient for upper area
    const upperGradient = ctx.createLinearGradient(0, 0, 0, height)
    upperGradient.addColorStop(0, "rgba(79, 70, 229, 0.2)")
    upperGradient.addColorStop(1, "rgba(79, 70, 229, 0.05)")
    ctx.fillStyle = upperGradient
    ctx.fill()

    // Draw upper line
    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom - data.upperLine[0] * yScale)

    for (let i = 0; i < data.upperLine.length; i++) {
      const x = padding.left + i * xScale
      const y = height - padding.bottom - data.upperLine[i] * yScale
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "rgb(79, 70, 229)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw lower line
    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom - data.lowerLine[0] * yScale)

    for (let i = 0; i < data.lowerLine.length; i++) {
      const x = padding.left + i * xScale
      const y = height - padding.bottom - data.lowerLine[i] * yScale
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "rgb(147, 197, 253)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw x-axis labels
    ctx.fillStyle = "#6B7280"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"

    for (let i = 0; i < data.labels.length; i++) {
      const x = padding.left + i * xScale
      const y = height - padding.bottom + 20
      ctx.fillText(data.labels[i], x, y)
    }

    // Draw y-axis labels
    ctx.textAlign = "right"
    const yLabels = [0, 50, 100, 150, 200, 250]

    for (let i = 0; i < yLabels.length; i++) {
      const value = yLabels[i]
      const y = height - padding.bottom - value * yScale
      ctx.fillText(value.toString(), padding.left - 10, y + 4)
    }

    // Draw tooltip if visible
    if (tooltip.visible && tooltip.index >= 0 && tooltip.index < data.labels.length) {
      const x = padding.left + tooltip.index * xScale
      const upperY = height - padding.bottom - data.upperLine[tooltip.index] * yScale
      const lowerY = height - padding.bottom - data.lowerLine[tooltip.index] * yScale

      // Draw vertical line at hover position
      ctx.beginPath()
      ctx.setLineDash([5, 3])
      ctx.moveTo(x, height - padding.bottom)
      ctx.lineTo(x, padding.top)
      ctx.strokeStyle = "rgba(107, 114, 128, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Draw dots at data points
      // Upper point
      ctx.beginPath()
      ctx.arc(x, upperY, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgb(79, 70, 229)"
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Lower point
      ctx.beginPath()
      ctx.arc(x, lowerY, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgb(147, 197, 253)"
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Set chart dimensions
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = canvas.width - padding.left - padding.right
    const xScale = chartWidth / (data.labels.length - 1)

    // Find closest data point
    if (x >= padding.left && x <= canvas.width - padding.right) {
      const dataIndex = Math.round((x - padding.left) / xScale)

      if (dataIndex >= 0 && dataIndex < data.labels.length) {
        setTooltip({
          visible: true,
          x: x,
          y: y,
          index: dataIndex,
          upperValue: data.upperLine[dataIndex],
          lowerValue: data.lowerLine[dataIndex],
          label: data.labels[dataIndex],
        })
      }
    }
  }

  const handleMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      index: -1,
      upperValue: 0,
      lowerValue: 0,
      label: "",
    })
  }

  useEffect(() => {
    // Set canvas dimensions based on container size
    const canvas = canvasRef.current
    if (canvas) {
      // Set the canvas to be responsive
      const resizeCanvas = () => {
        const container = canvas.parentElement
        canvas.width = container.clientWidth
        canvas.height = 400
        drawChart()
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [])

  // Redraw chart when data or period changes
  useEffect(() => {
    drawChart()
  }, [data, period, tooltip])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
      {tooltip.visible && (
        <div
          className="absolute pointer-events-none bg-white p-3 rounded-md shadow-md border border-gray-200 z-10 min-w-[150px]"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y - 80}px`,
            transform: tooltip.x > canvasRef.current?.width * 0.7 ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <div className="font-medium text-gray-800 mb-2">{tooltip.label}</div>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
            <span className="text-gray-500 font-medium mr-2">Target:</span>
            <span className="text-gray-700 font-semibold">{tooltip.upperValue}</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
            <span className="text-gray-500 font-medium mr-2">Actual:</span>
            <span className="text-gray-700 font-semibold">{tooltip.lowerValue}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasChart
