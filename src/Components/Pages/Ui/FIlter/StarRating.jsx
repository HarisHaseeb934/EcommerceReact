import { useEffect, useState } from "react";
import Star from "../Star";

const StarRating = ({
  initialRating = 0,
  maxRating = 5,
  readOnly = false,
  onChange,
  size = 24,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);

  // useEffect(() => {
  //   setRating(initialRating);
  // }, [initialRating]);

  const displayValue = hoverRating !== null ? hoverRating : rating;
  const filledColor = (displayValue / maxRating) * 100;

  const calculateRating = (e) => {
    const buttonPosition = e.currentTarget.getBoundingClientRect();
    const mousePositionInBox = e.clientX - buttonPosition.left;
    const value = Math.min(
      Math.max(mousePositionInBox / buttonPosition.width, 0),
      1,
    );
    const percentage = value * maxRating;
    const adjustPrecision = Math.ceil(percentage / 0.1) * 0.1;
    return adjustPrecision;
  };

  const handleMouseMove = (e) => {
    if (readOnly) return;
    const score = calculateRating(e);
    setHoverRating(score);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(null);
  };

  const handleClick = (e) => {
    if (readOnly) return;
    const score = calculateRating(e);
    setRating(score);
    onChange?.(score);
  };

  return (
    <button
      disabled={readOnly}
      className={`${readOnly ? "cursor-default" : "cursor-pointer"} relative`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="pointer-events-none flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          return <Star key={`grey-${index}`} size = {size}/>;
        })}
      </div>
      <div
        className="pointer-events-none flex absolute top-0 left-0 overflow-hidden whitespace-nowrap"
        style={{
          width: `${filledColor}%`,
        }}
      >
        {Array.from({ length: maxRating }).map((_, index) => {
          return <Star key={`gold-${index}`} className={"text-amber-400"} size = {size}/>;
        })}
      </div>
    </button>
  );
};

export default StarRating;
