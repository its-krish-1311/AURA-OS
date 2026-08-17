'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#06070B',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Critical Core Failure</h1>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
            A fatal error occurred at the layout level. Aura OS could not initialize the core interface.
          </p>
          <button 
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#A855F7',
              color: 'white',
              border: 'none',
              borderRadius: '99px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Attempt Reboot
          </button>
        </div>
      </body>
    </html>
  );
}
