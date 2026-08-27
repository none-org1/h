import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClaimProvider } from '@/context/ClaimContext';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PF Claim Decoder & Action Pack — Translate PF Remarks into Action',
  description:
    'An independent prototype to decode ambiguous EPFO claim remarks into verified facts, evidentiary checklists, and tailored Grievance and RTI drafts.',
  keywords: [
    'EPFO',
    'PF Claim',
    'PF Claim Decoder',
    'EPFiGMS',
    'RTI Online',
    'Provident Fund',
    'Claim Status',
  ],
  authors: [{ name: 'Independent Citizen Prototype' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ClaimProvider>
          <Header />
          <ProgressBar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ClaimProvider>
      </body>
    </html>
  );
}
