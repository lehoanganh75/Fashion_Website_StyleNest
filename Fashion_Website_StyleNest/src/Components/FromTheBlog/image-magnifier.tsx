"use client"

import React, { useState, useRef } from "react"

interface ImageMagnifierProps {
  src: string
  alt: string
  width: number
  height: number
  magnifierSize?: number
  zoomLevel?: number
  className?: string
}

export default function ImageMagnifier({
  src,
  alt,
  width,
  height,
  magnifierSize = 150,
  zoomLevel = 2.5,
  className = "",
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setMousePosition({ x, y })
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      ref={imageRef}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none shadow-lg rounded-full bg-white z-10"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: `calc(${mousePosition.x}% - ${magnifierSize / 2}px)`,
            top: `calc(${mousePosition.y}% - ${magnifierSize / 2}px)`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${mousePosition.x * zoomLevel}% ${mousePosition.y * zoomLevel}%`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
