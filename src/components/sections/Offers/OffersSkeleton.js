export default function OffersSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div 
          key={item} 
          className="bg-charcoal h-[420px] animate-pulse border border-dark-silver flex flex-col"
        >
          <div className="h-48 bg-gunmetal"></div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="h-6 w-3/4 bg-gunmetal mb-4"></div>
            <div className="h-4 w-1/4 bg-gunmetal mb-4"></div>
            <div className="h-4 w-full bg-gunmetal mb-2"></div>
            <div className="h-4 w-5/6 bg-gunmetal mb-2"></div>
            <div className="h-4 w-4/6 bg-gunmetal mb-4"></div>
            <div className="flex-1"></div>
            <div className="h-10 w-full bg-gunmetal mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
