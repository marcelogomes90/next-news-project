'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider as TanstackQueryProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: ProviderProps) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    }),
  );

  return <TanstackQueryProvider client={queryClient}>{children}</TanstackQueryProvider>;
}
