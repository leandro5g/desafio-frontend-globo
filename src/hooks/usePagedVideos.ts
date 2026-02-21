import { useCallback, useEffect, useRef, useState } from "react";

type PaginatedResult<T> = {
  data: T[];
  total: number;
  totalPages: number;
};

type UsePaginatedFetchOptions = {
  initialPage?: number;
  pageSize?: number;
  deps?: unknown[];
};

export function usePaginatedFetch<T>(
  fetcher: (page: number, pageSize: number) => Promise<PaginatedResult<T>>,
  { initialPage = 1, pageSize = 10, deps = [] }: UsePaginatedFetchOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcherRef = useRef(fetcher);
  useEffect(() => { fetcherRef.current = fetcher; }, [fetcher]);

  const run = useCallback(
    async (p: number) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherRef.current(p, pageSize);
        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
      } finally {
        setLoading(false);
      }
    },
    [pageSize, ...deps]
  );

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setPage(1);
    run(1);
  }, deps);

  useEffect(() => {
    run(page);
  }, [page, run]);

  const goToPage = useCallback(
    (p: number) => {
      if (p < 1 || p > totalPages) return;
      setPage(p);
    },
    [totalPages]
  );

  const refresh = useCallback(() => run(page), [run, page]);

  return { data, page, total, totalPages, loading, error, goToPage, refresh };
}