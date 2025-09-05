export function FiltersSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      
      {/* Category skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Color skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* Price skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      
      {/* Checkboxes skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}