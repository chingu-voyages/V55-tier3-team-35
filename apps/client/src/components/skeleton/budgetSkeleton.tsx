import { Skeleton } from '@/components/ui/skeleton';

// Skeleton for BudgetHeader
const BudgetHeaderSkeleton = () => (
  <div className="mb-8 space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-48 h-4" />
      </div>
      <Skeleton className="w-28 h-10" />
    </div>
  </div>
);

// Skeleton for BudgetPieChart
const BudgetPieChartSkeleton = () => (
  <div className="bg-white rounded-lg p-6 border">
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="w-40 h-6" />
        <Skeleton className="w-32 h-4" />
      </div>

      {/* Pie Chart Circle */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <Skeleton className="w-48 h-48 rounded-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Skeleton className="w-16 h-8" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-24 h-4" />
            </div>
            <div className="text-right space-y-1">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Skeleton for CategoryCard
const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-lg p-6 border space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="text-right space-y-1">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>

    {/* Progress Bar */}
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Skeleton className="w-16 h-3" />
        <Skeleton className="w-12 h-3" />
      </div>
      <Skeleton className="w-full h-2 rounded-full" />
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2 pt-2">
      <Skeleton className="w-20 h-8" />
      <Skeleton className="w-16 h-8" />
    </div>
  </div>
);

// Loading Skeleton Component
const BudgetsPageSkeleton = () => (
  <div className="px-[16px] py-[24px] lg:py-[32px] lg:px-[40px] mb-[66px] md:mb-0">
    <BudgetHeaderSkeleton />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <BudgetPieChartSkeleton />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default BudgetsPageSkeleton;
