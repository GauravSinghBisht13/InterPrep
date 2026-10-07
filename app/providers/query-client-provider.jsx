"use client"; //by default conponent is server but tnstack need to use hook so convertting it to client compoent
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // importing 2 things queryclient(manager thta manages cache, queries, mutations) and
// queryclientprovider (providers query client to all childrens)

function QueryClientProviderClient({ children }) {
  const [queryClient] = useState(() => new QueryClient()); //most imp line

  //new QueryClient() - creates brand new query client
  // why not doing const queryClient = new QueryClient(); why using usestate
  //Each render creates a new cache. so used usestate bcz useState initializes the value only once.
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryClientProviderClient;
