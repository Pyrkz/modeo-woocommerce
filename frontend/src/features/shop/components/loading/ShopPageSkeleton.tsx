// Exact skeleton replica of the shop page layout
export function ShopPageSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar Skeleton - exact match */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto px-3 py-4 bg-gray-50 rounded-lg">
              <div className="px-1 space-y-0">
                {/* Active filters skeleton */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  </div>
                </div>

                {/* Search section skeleton */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between w-full py-4">
                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="pb-4">
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Categories section skeleton */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between w-full py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-5 w-5 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="pb-4 space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors section skeleton */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between w-full py-4">
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Price section skeleton */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between w-full py-4">
                    <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Availability section skeleton */}
                <div>
                  <div className="flex items-center justify-between w-full py-4">
                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton - exact match */}
          <div className="flex-1 min-w-0 px-2 sm:px-0">
            {/* Mobile Filter Toggle Skeleton */}
            <div className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg mb-6">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            {/* Products Info Skeleton - exact match */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            
            {/* Product Grid Skeleton - exact match */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="group relative bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  {/* Image skeleton */}
                  <div className="relative aspect-square bg-gray-200">
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

            {/* Load More Button Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="h-12 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}