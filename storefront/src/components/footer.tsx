import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const tContact = useTranslations('contact');

  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="container-page py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-tightest">{tBrand('name')}</div>
          <p className="mt-4 max-w-sm text-paper/70 text-sm leading-relaxed">
            {tBrand('footerNote')}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-paper/50 mb-4">{t('shop')}</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white text-paper/80">{t('shop')}</Link></li>
            <li><Link href="/sale" className="hover:text-white text-paper/80">{t('sale')}</Link></li>
            <li><Link href="/account" className="hover:text-white text-paper/80">{t('account')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-paper/50 mb-4">{tContact('outlets')}</div>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>Batumi · Outlet 1</li>
            <li>Batumi · Outlet 2</li>
            <li>Batumi · Outlet 3</li>
            <li>Tbilisi · New</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest text-paper/50">
          <span>© {new Date().getFullYear()} {tBrand('name')}</span>
          <span>{tContact('hours')}</span>
        </div>
      </div>
    </footer>
  );
}
