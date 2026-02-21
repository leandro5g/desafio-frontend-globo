const FETCH_VIDEOS_QUERY = `
  query FetchVideos($page: Int!, $limit: Int!) {
    videos(page: $page, limit: $limit) {
      total
      totalPages
      videos {
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;

export { FETCH_VIDEOS_QUERY };