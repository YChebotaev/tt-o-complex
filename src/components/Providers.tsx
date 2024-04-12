import { useMemo, type FC, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createApiClient } from "@/lib/apiClient";
import { ApiClientProvider } from "@/hooks/useApiClient";
import { CartProvider } from "@/hooks/useCart";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const apiClient = useMemo(() => createApiClient(), []);
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <ApiClientProvider apiClient={apiClient}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </ApiClientProvider>
  );
};
