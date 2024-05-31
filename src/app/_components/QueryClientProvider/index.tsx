'use client';

import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: ProviderProps) {
  const [client] = useState(new QueryClient());

  return (
    <QueryProvider client={client}>
      {children}
    </QueryProvider>
  );
}
