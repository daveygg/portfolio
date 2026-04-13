import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <article className="border-b border-border p-4 grid grid-cols-[auto_1fr_auto] animate-pulse">
      <Skeleton className="col-start-1 row-start-1 row-span-2 size-10 rounded-full" />
      <div className="col-start-2 row-start-1 pl-3 flex gap-2 items-center mb-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="col-start-2 row-start-2 px-3 space-y-2">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-40 w-[70%]" />
      </div>
    </article>
  );
}