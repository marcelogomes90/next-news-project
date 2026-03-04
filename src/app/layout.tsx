import type { Metadata } from 'next';
import './globals.css';
import QueryClientProvider from '@/providers/queryClientProvider';

export const metadata: Metadata = {
  title: 'Portal de Noticias IBGE',
  description: 'Acompanhe noticias publicadas pela Agencia IBGE com filtros e navegacao rapida.',
  icons: {
    icon: '/news.png',
    shortcut: '/news.png',
    apple: '/news.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
