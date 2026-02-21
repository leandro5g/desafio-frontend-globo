export const FETCH_FEEDBACKS_BY_VIDEO_ID = `
  query FetchFeedbacks($videoId: String!, $page: Int!, $limit: Int!) {
    feedbacks(videoId: $videoId, page: $page, limit: $limit) {
      feedbacks {
        id
        videoId
        comment
        rating
        username
      }
      total
      totalPages
    }
  }
`;

export const CREATE_FEEDBACK_MUTATION = `
  mutation CreateFeedback($data: CreateFeedbackInput!) {
    createFeedback(data: $data) {
      id
      videoId
      comment
      rating
      username
    }
  }
`;