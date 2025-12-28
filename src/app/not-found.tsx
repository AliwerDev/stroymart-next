'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <p style={styles.title}>404</p>
        <p style={styles.subtitle}>Page not found</p>

        <div style={styles.actions}>
          <Link href="/" style={styles.primary}>
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter, sans-serif',
  },
  card: {
    maxWidth: 420,
    padding: '48px 32px',
    textAlign: 'center',
  },
  code: {
    fontSize: 72,
    fontWeight: 700,
    margin: 0,
    color: '#111827',
  },
  title: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 600,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#6b7280',
    marginBottom: 32,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  primary: {
    padding: '10px 18px',
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 6,
    textDecoration: 'none',
    border: '1px solid #111827',
    backgroundColor: '#111827',
    color: '#ffffff',
  },
};
