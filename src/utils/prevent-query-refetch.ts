export const preventQueryRefetch = () => ({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  cacheTime: Infinity,
});
