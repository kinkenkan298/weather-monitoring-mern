import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import { NotFound } from "./components/not-found";
import { DefaultCatchBoundry } from "./components/default-catch-boundry";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 60 * 1000 * 10,
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  const router = routerWithQueryClient(
    createRouter({
      routeTree,
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      scrollRestoration: true,
      defaultErrorComponent: DefaultCatchBoundry,
      defaultNotFoundComponent: () => <NotFound />,
      context: { queryClient },
    }),
    queryClient,
  );

  return router;
};
