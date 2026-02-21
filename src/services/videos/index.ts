import { api } from "../../lib/api";
import { FETCH_VIDEOS_QUERY } from "./querys";

export const fetchVideos = async (page: number, pageSize: number) => {
  const response = await api.post("/graphql", {
    query: FETCH_VIDEOS_QUERY,
    variables: { page, limit: pageSize },
  });

  const { videos, total, totalPages } = response.data.data.videos;

  return { data: videos, total, totalPages };
};
