import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryClientProvider from '@/providers/queryClientProvider';
import Provider from '@/providers/reduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal de Notícias IBGE',
  description: 'Criado por Marcelo Gomes',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <Provider>
            {children}
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
