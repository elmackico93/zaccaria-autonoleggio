import Link from 'next/link';

/**
 * FooterLinksSEO Component
 * Displays SEO-optimized links in the footer
 */
export default function FooterLinksSEO() {
  return (
    <div className="mt-8 pt-6 border-t border-dark-silver">
      <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-center">Servizi in Puglia</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Servizi NCC</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/servizi-puglia" className="text-xs text-silver hover:text-white transition-colors">
                Tutti i Servizi
              </Link>
            </li>
            <li>
              <Link href="/ncc-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                NCC Ostuni
              </Link>
            </li>
            <li>
              <Link href="/ncc-bari" className="text-xs text-silver hover:text-white transition-colors">
                NCC Bari
              </Link>
            </li>
            <li>
              <Link href="/ncc-salento" className="text-xs text-silver hover:text-white transition-colors">
                NCC Salento
              </Link>
            </li>
            <li>
              <Link href="/autonoleggio-con-conducente-alberobello" className="text-xs text-silver hover:text-white transition-colors">
                NCC Alberobello
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Transfer</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/transfer-aeroporto-brindisi" className="text-xs text-silver hover:text-white transition-colors">
                Transfer Aeroporto Brindisi
              </Link>
            </li>
            <li>
              <Link href="/transfer-bari-ostuni" className="text-xs text-silver hover:text-white transition-colors">
                Transfer Bari-Ostuni
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Tour</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/tour-autista-privato-puglia" className="text-xs text-silver hover:text-white transition-colors">
                Tour Privati in Puglia
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold mb-2 text-silver-metallic">Autonoleggio</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/autonoleggio-con-conducente-alberobello" className="text-xs text-silver hover:text-white transition-colors">
                Autonoleggio Alberobello
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
