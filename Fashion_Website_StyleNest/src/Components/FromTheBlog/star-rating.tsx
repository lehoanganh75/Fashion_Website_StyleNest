interface StarRatingProps {
    rating: number
    maxRating?: number
  }
  
  export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
    return (
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    )
  }
  