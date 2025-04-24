export default function OffersHeader() {
  return (
    <div className="grid md:grid-cols-12 gap-8 mb-20">
      <div className="md:col-span-3">
        <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">Offerte Speciali</h2>
        <div className="w-12 h-[1px] bg-silver-metallic"></div>
      </div>
      <div className="md:col-span-9">
        <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
          <span className="text-silver">Soluzioni esclusive</span> per esplorare la Puglia con stile e comfort. 
          Approfitta delle nostre offerte limitate.
        </p>
      </div>
    </div>
  );
}
