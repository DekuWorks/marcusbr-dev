import SkeletonBlock from "./SkeletonBlock";

export default function FeaturedProjectsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading featured projects"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-4 w-36" />
            <SkeletonBlock className="h-9 w-full max-w-md" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
            <SkeletonBlock className="h-4 w-4/5 max-w-xl" />
          </div>
          <SkeletonBlock className="hidden h-11 w-36 sm:block" />
        </div>

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-[min(100%,320px)] shrink-0 sm:w-[340px]"
            >
              <div className="overflow-hidden rounded-2xl border border-jade-border bg-card/80">
                <SkeletonBlock className="h-44 w-full rounded-none border-0" />
                <div className="space-y-3 p-5">
                  <SkeletonBlock className="h-5 w-3/4" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                  <div className="flex gap-2 pt-1">
                    <SkeletonBlock className="h-6 w-16 rounded-md" />
                    <SkeletonBlock className="h-6 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
