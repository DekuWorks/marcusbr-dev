import SkeletonBlock from "./SkeletonBlock";

export default function ExperienceSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading experience timeline"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <SkeletonBlock className="h-4 w-44" />
            <SkeletonBlock className="h-9 w-full max-w-sm" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
            <SkeletonBlock className="h-4 w-4/5 max-w-xl" />
          </div>
          <SkeletonBlock className="h-11 w-40" />
        </div>

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-[min(100%,320px)] shrink-0 sm:w-[min(100%,300px)] lg:w-[min(100%,280px)]"
            >
              <div className="rounded-xl border border-jade-border bg-card/80 p-5 sm:p-6">
                <SkeletonBlock className="h-5 w-3/4" />
                <SkeletonBlock className="mt-3 h-4 w-1/2" />
                <SkeletonBlock className="mt-2 h-3 w-24" />
                <SkeletonBlock className="mt-4 h-4 w-full" />
                <SkeletonBlock className="mt-2 h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
