import Link from 'next/link';

/**
 * FooterLinksSEO Component
 * Displays SEO-optimized links in the footer
 */
export default function FooterLinksSEO() {
  return (
    <div className="mt-8 pt-6 border-t border-dark-silver">
      <h4 className="text-sm font-bold tracking-widest mb-4 uppercase">Servizi in Puglia</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <Link href="/ncc-ostuni" className="text-silver-metallic hover:text-white transition-colors">
          NCC Ostuni
        </Link>
        <Link href="/transfer-aeroporto-brindisi" className="text-silver-metallic hover:text-white transition-colors">
          Transfer Aeroporto Brindisi
        </Link>
        <Link href="/autonoleggio-con-conducente-alberobello" className="text-silver-metallic hover:text-white transition-colors">
          Autonoleggio con Conducente Alberobello
        </Link>
        <Link href="/tour-autista-privato-puglia" className="text-silver-metallic hover:text-white transition-colors">
          Tour con Autista Privato in Puglia
        </Link>
        <Link href="/transfer-bari-ostuni" className="text-silver-metallic hover:text-white transition-colors">
          Transfer Bari Ostuni
        </Link>
      </div>
    </div>
  );
}
