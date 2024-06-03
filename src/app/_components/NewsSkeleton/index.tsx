import { Skeleton } from '@/components/ui/skeleton';

export default function NewsSkeleton() {
  return (
    <div className="flex flox-row gap-4 mb-8 items-center">
      <Skeleton className="h-28 w-60" />
      <div className="flex-col w-full">
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}
