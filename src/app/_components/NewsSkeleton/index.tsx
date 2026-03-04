import { Skeleton } from '@/components/ui/skeleton';

export default function NewsSkeleton() {
  return (
    <div className="mb-5 rounded-2xl border border-border/70 bg-card/70 p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-44 w-full rounded-xl md:h-32 md:w-56" />
        <div className="w-full space-y-3">
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
