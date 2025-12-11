'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-transparent text-gray-300'
          )}
        />
      ))}
    </div>
  );
}
