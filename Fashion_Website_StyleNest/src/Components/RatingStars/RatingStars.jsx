import { Star } from "lucide-react"

const RatingStars = ({ rating, maxRating = 5 }) => {
    return (
        <div className="flex">
            {Array.from({ length: maxRating }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
            ))}
        </div>
    )
}

export default RatingStars