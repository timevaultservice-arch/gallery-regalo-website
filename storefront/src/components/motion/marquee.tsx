'use client';

import type { ReactNode } from 'react';

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        <div className="inline-flex shrink-0 px-8">{children}</div>
        <div className="inline-flex shrink-0 px-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
