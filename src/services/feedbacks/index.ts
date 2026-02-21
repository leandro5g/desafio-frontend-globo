import { api } from "../../lib/api";
import {
  CREATE_FEEDBACK_MUTATION,
  FETCH_FEEDBACKS_BY_VIDEO_ID,
} from "./querys";

export type DataFeedback = {
  username: string;
  comment: string;
  rating: number;
  videoId: string;
};

export type GetFeedbackParams = {
  videoId: string;
  page: number;
  limit: number;
};

export const registerFeedback = async (data: DataFeedback) => {
  const response = await api.post("/graphql", {
    query: CREATE_FEEDBACK_MUTATION,
    variables: {
      data,
    },
  });

  return response.data;
};

export const getFeedbacks = async ({
  videoId,
  page,
  limit,
}: GetFeedbackParams) => {
  const response = await api.post("/graphql", {
    query: FETCH_FEEDBACKS_BY_VIDEO_ID,
    variables: { videoId, page, limit },
  });

  const { feedbacks, total, totalPages } = response.data.data.feedbacks;

  return { data: feedbacks, total, totalPages };
};
