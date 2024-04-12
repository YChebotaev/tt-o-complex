'use client'

import { createContext, useContext, type FC, type ReactNode } from "react";
import { type ApiClient } from "@/lib/apiClient";

const context = createContext<ApiClient | null>(null);

export const useApiClient = () => useContext(context)!;

export const ApiClientProvider: FC<{
  apiClient: ApiClient;
  children: ReactNode;
}> = ({ apiClient, children }) => (
  <context.Provider value={apiClient}>{children}</context.Provider>
);
