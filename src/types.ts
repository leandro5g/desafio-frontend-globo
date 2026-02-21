export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
};

export type PageResult<T> = {
  items: T[];
  total: number;
  hasMore: boolean;
};