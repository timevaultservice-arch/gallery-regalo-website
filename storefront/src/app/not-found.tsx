import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
        <p>Page not found.</p>
        <Link href="/">Go home</Link>
      </body>
    </html>
  );
}
