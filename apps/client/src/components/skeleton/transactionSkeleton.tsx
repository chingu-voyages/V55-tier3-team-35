import { Skeleton } from '@/components/ui/skeleton';

const TransactionPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <Skeleton className="h-3 w-12" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <Skeleton className="h-3 w-16" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <Skeleton className="h-3 w-20" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <Skeleton className="h-3 w-10" />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <Skeleton className="h-3 w-16" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-8" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPageSkeleton;
