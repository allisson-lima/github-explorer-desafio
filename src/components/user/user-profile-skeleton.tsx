import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function UserProfileSkeleton() {
  return (
    <Card className="h-fit w-full">
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-col items-center">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="mt-4 h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-3 gap-2 pt-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </CardContent>
    </Card>
  );
}
