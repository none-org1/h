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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased selection:bg-blue-500 selection:text-white">
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
