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
    error,
    refresh,
  } = usePaginatedFetch(fetchVideos);

  const renderContent = () => {
    if (error) {
      return (
        <div
          className="feedbackItem"
          style={{
            textAlign: "center",
            padding: "2.5rem",
            borderColor: "rgba(239,68,68,0.3)",
            background: "rgba(239,68,68,0.06)",
          }}
        >
          <p style={{ margin: "0 0 1rem", fontSize: 15 }}>
            ⚠ Não foi possível carregar os vídeos.
          </p>
          <p className="muted small" style={{ margin: "0 0 1.25rem" }}>
            Verifique sua conexão e tente novamente.
          </p>
          <button className="btn primary" onClick={refresh}>
            Tentar novamente
          </button>
        </div>
      );
    }

    if (loading && videos.length === 0) {
      return <SkeletonGrid />;
    }

    return (
      <>
        <div style={{ opacity: loading ? 0.6 : 1, transition: "opacity .2s" }}>
          <VideoList
            videos={videos as Video[]}
            page={page}
            onVideoClick={(video) => console.log("clicou", video.id)}
          />
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPrev={() => goToPage(page - 1)}
          onNext={() => goToPage(page + 1)}
          canPrev={page > 1}
          canNext={page < totalPages}
        />
      </>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">Desafio Globo</div>
      </header>

      <main className="container">
        <h1 className="title">Home</h1>
        {renderContent()}
      </main>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0 }
          100% { background-position:  600px 0 }
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.09) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 6px;
        }
      `}</style>
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card" style={{ pointerEvents: "none" }}>
            <div
              className="skeleton"
              style={{ width: "100%", aspectRatio: "16/9" }}
            />
            <div className="cardBody" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="skeleton" style={{ height: 16, width: "80%" }} />
              <div className="skeleton" style={{ height: 12, width: "55%" }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}