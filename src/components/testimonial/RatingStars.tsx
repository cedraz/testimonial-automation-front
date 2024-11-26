'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  onChange?: (rating: number) => void;
  value?: number;
}

export function RatingStars({ onChange, value = 0 }: RatingStarsProps) {
  const [rating, setRating] = React.useState(value);
  const [hover, setHover] = React.useState(0);

  const handleClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          type="button"
          key={star}
          variant="ghost"
          size="sm"
          className={`
            p-0 hover:text-yellow-400
            ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(star)}
        >
          <Star className="h-6 w-6 fill-current" />
        </Button>
      ))}
    </div>
  );
}
