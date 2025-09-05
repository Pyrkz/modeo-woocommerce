'use client';

import { ReviewStats } from '../types';
import { StarRating } from './StarRating';

interface ReviewStatsProps {
  stats: ReviewStats;
  loading?: boolean;
}

export function ReviewStatsComponent({ stats, loading }: ReviewStatsProps) {
  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-8 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 bg-gray-300 rounded w-8"></div>
              <div className="h-2 bg-gray-300 rounded flex-1"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stats.total_reviews === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          
          <div className="mb-3">
            <StarRating rating={0} readonly size="lg" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak ocen</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
            Ten produkt nie ma jeszcze żadnych ocen. Twoja opinia będzie pierwszą!
          </p>
        </div>
      </div>
    );
  }

  const getPercentage = (count: number) => {
    return stats.total_reviews > 0 ? Math.round((count / stats.total_reviews) * 100) : 0;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {stats.average_rating.toFixed(1)}
          </div>
          <div className="mb-2">
            <StarRating rating={stats.average_rating} readonly size="lg" />
          </div>
          <div className="text-sm text-gray-600">
            {stats.total_reviews} {stats.total_reviews === 1 ? 'recenzja' : 'recenzji'}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.rating_counts[rating as keyof typeof stats.rating_counts];
            const percentage = getPercentage(count);

            return (
              <div key={rating} className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 w-12">
                  <span>{rating}</span>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="text-gray-600 w-8 text-right">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}