import GiftOccasionCardSkeleton from '@/features/gift-occasions/components/GiftOccasionCardSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-12 bg-gray-200 rounded-lg mb-6 w-3/4 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-2 w-full max-w-3xl mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-8 w-2/3 max-w-3xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Gift Occasions Section Skeleton */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-lg mb-4 w-1/2 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 max-w-4xl mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 max-w-4xl mx-auto animate-pulse" />
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {Array.from({ length: 15 }, (_, i) => (
              <GiftOccasionCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 bg-gray-200 rounded-lg mb-6 w-2/3 mx-auto animate-pulse" />
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}