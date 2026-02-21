import Pagination from "../components/Pagination";
import VideoList from "../components/VideoList";
import { usePaginatedFetch } from "../hooks/usePagedVideos";
import { fetchVideos } from "../services/videos";
import type { Video } from "../types";

export function Home() {
  const {
    data: videos,
    page,
    totalPages,
    loading,
    goToPage,
  } = usePaginatedFetch(fetchVideos);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">Desafio Globo</div>
      </header>

      <main className="container">
        <h1 className="title">Home</h1>
        <VideoList
          videos={videos as Video[]}
          page={page}
          onVideoClick={(video) => console.log("clicou", video.id)}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPrev={() => goToPage(page - 1)}
          onNext={() => goToPage(page + 1)}
          canPrev={page > 1}
          canNext={page < totalPages}
        />
      </main>
    </div>
  );
}
