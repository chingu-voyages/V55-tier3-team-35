import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ChartSkeleton = ({ height = 300 }: { height?: number }) => (
  <div className="space-y-3">
    <Skeleton className={`w-full h-[${height}px]`} />
    <div className="flex justify-center gap-8">
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-12 h-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  </div>
);

const DonutChartSkeleton = () => (
  <div className="space-y-6">
    <div className="relative w-48 h-48 mx-auto">
      <Skeleton className="w-48 h-48 rounded-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-24 h-4" />
      </div>
    </div>
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-12 h-4" />
        </div>
      ))}
    </div>
  </div>
);

const BarChartSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="w-3 h-3 rounded" />
        <Skeleton className="w-12 h-4" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-3 h-3 rounded" />
        <Skeleton className="w-12 h-4" />
      </div>
    </div>
    <div className="flex items-end justify-between h-32 gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-1 items-end h-24">
            <Skeleton
              className="w-3 rounded-t"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
            <Skeleton
              className="w-3 rounded-t"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          </div>
          <Skeleton className="w-8 h-3" />
        </div>
      ))}
    </div>
  </div>
);

const TransactionSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0">
    <div className="flex items-center gap-3">
      <div>
        <Skeleton className="w-32 h-4 mb-1" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
    <Skeleton className="w-16 h-5" />
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="w-32 h-9" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="bg-white border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="w-28 h-4" />
                    <Skeleton className="w-20 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Transactions Chart */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Skeleton className="w-48 h-6" />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ChartSkeleton height={300} />
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Skeleton className="w-40 h-6" />
                  </CardTitle>
                  <Button variant="ghost" size="sm" disabled>
                    <Skeleton className="w-16 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TransactionSkeleton key={i} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Spending Chart */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <Skeleton className="w-20 h-6" />
                  </CardTitle>
                  <Button variant="ghost" size="sm" disabled>
                    <Skeleton className="w-20 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <DonutChartSkeleton />
              </CardContent>
            </Card>

            {/* Spending vs Target */}
            <Card>
              <CardHeader className="bg-white border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Skeleton className="w-36 h-6" />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <BarChartSkeleton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
