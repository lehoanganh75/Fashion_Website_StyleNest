const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
