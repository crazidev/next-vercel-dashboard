const Skeleton = ({ isLoading, children, className }: { isLoading: boolean, children: any, className?: string }) => {
    if (!isLoading) return children;

    return (
        <div className={`relative w-full h-full ${className}`}>
            <div className="w-full h-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
    );
};