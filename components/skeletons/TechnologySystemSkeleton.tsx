import SkeletonBlock from "./SkeletonBlock";

export default function TechnologySystemSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading technology stack"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 space-y-3">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-9 w-full max-w-sm" />
          <SkeletonBlock className="h-4 w-full max-w-2xl" />
          <SkeletonBlock className="h-4 w-3/4 max-w-xl" />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock
              key={index}
              className="h-10 w-24 rounded-full"
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 18 }).map((_, index) => (
            <SkeletonBlock
              key={index}
              className="h-9 w-[calc(50%-0.25rem)] rounded-lg sm:w-[calc(33.333%-0.375rem)] lg:w-[calc(25%-0.375rem)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
