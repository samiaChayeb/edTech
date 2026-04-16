import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EdTech Platform — Apprenez autrement',
  description: 'Plateforme éducative nouvelle génération — cours vidéo HD, classes virtuelles, accompagnement personnalisé.',
  metadataBase: new URL('https://edtech-platform.com'),
  openGraph: {
    title: 'EdTech Platform',
    description: 'Cours vidéo HD, classes virtuelles et accompagnement personnalisé.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('edtech_theme');
                const isDark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
