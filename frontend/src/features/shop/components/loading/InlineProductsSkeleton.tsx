// Skeleton that overlays just the products area during filtering
export function InlineProductsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="relative">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-gray-600 font-medium">Szukam produktów...</span>
          </div>
        </div>
      </div>
      
      {/* Grid skeleton underneath */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="group relative bg-white rounded-lg overflow-hidden shadow-sm opacity-50">
            {/* Image skeleton */}
            <div className="relative aspect-square bg-gray-200 animate-pulse">
              {/* Badges skeleton */}
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                <div className="h-5 w-12 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Product info skeleton */}
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}