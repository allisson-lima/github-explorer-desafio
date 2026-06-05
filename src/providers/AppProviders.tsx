import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { queryClient } from '@/lib/query-client';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NuqsAdapter>{children}</NuqsAdapter>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
