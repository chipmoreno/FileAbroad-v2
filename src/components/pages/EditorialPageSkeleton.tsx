import { Skeleton } from '@/components/ui/skeleton';

export default function EditorialPageSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-28" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Skeleton className="h-4 w-36" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <Skeleton className="h-5 w-44" />
            <Skeleton className="mt-5 h-14 w-full max-w-3xl" />
            <Skeleton className="mt-3 h-14 w-4/5 max-w-2xl" />
            <Skeleton className="mt-7 h-6 w-full max-w-2xl" />
            <Skeleton className="mt-3 h-6 w-3/4 max-w-xl" />
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-[14rem_1fr]">
          <div className="hidden space-y-3 lg:block">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-9 w-3/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-36 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
