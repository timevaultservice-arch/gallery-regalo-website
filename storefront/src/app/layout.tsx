// Root layout is a passthrough — the real html/body shell lives in
// [locale]/layout.tsx so we can attach lang={locale} and load
// next-intl messages. This file exists only to satisfy Next.js 15's
// requirement that a root layout sit next to app/not-found.tsx.

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
