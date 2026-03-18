
export function ApplicationSkeleton() {
    return (
        <div className="bg-white border border-brand-neutrals-20 animate-pulse">
            <div className="flex items-start gap-4 p-5">
                {/* Avatar Skeleton */}
                <div className="size-11 shrink-0 bg-brand-neutrals-10" />

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="space-y-2">
                            {/* Name Skeleton */}
                            <div className="h-5 w-32 bg-brand-neutrals-10 rounded-sm" />
                            {/* Job Title Skeleton */}
                            <div className="h-4 w-48 bg-brand-neutrals-5 rounded-sm" />
                        </div>
                        {/* Badge Skeleton */}
                        <div className="h-6 w-20 bg-brand-neutrals-10 rounded-full" />
                    </div>

                    <div className="flex gap-4 mt-3">
                        {/* Metadata Skeletons */}
                        <div className="h-3 w-24 bg-brand-neutrals-5 rounded-sm" />
                        <div className="h-3 w-32 bg-brand-neutrals-5 rounded-sm" />
                    </div>
                </div>

                {/* Actions Skeleton */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="size-8 border border-brand-neutrals-10 bg-brand-neutrals-5" />
                    <div className="size-8 border border-brand-neutrals-10 bg-brand-neutrals-5" />
                    <div className="size-8 border border-brand-neutrals-10 bg-brand-neutrals-5" />
                </div>
            </div>
        </div>
    );
}