interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, max = 5, readOnly = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role={readOnly ? "img" : "group"} aria-label={`Calificación: ${value} de ${max}`}>
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;
        const star = (
          <span aria-hidden="true" className={`text-5xl leading-none ${rating <= value ? "text-gold" : "text-line"}`}>
            ★
          </span>
        );
        return (
          <button
            key={rating}
            type="button"
            disabled={readOnly || !onChange}
            onClick={() => onChange?.(rating)}
            aria-label={`${rating} ${rating === 1 ? "estrella" : "estrellas"}`}
            className="disabled:cursor-default"
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
