import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { SaleStrip } from '@/components/sale-strip';
import { locales, type Locale } from '@/i18n/config';
import '@/styles/globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap'
});
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: { default: 'Gallery Regalo', template: '%s · Gallery Regalo' },
  description: 'A Georgian gift gallery — porcelain, tableware, holiday pieces. Country-wide delivery.'
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          <SaleStrip />
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
