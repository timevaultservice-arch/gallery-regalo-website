export function GET() {
  const body = `User-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain' } });
}
