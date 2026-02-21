import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVideoContext } from "../context/VideoContext";
import FeedbackSection from "../components/FeedbackSection";

function toYouTubeEmbedUrl(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
    }

    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube-nocookie.com/embed/${v}`;

    if (u.pathname.includes("/embed/")) return url;

    return url;
  } catch {
    return url;
  }
}

export function VideoScreen() {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { videoSelected } = useVideoContext();

  const embedUrl = useMemo(() => toYouTubeEmbedUrl(videoSelected?.url), [videoSelected?.url]);

  return (
    <div className="videoPage">
      <header className="videoHeader">
        <button className="btn ghost" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="videoHeaderTitle">
          <span className="muted small">Vídeo</span>
          <strong className="videoHeaderName">
            {videoSelected?.title ?? "Detalhes"}
          </strong>
        </div>
      </header>

      <div className="videoBox">
        <div className="videoFrame">
          <div className="videoPlayer">
            <div className="videoRatio">
              <iframe
                src={embedUrl}
                title="YouTube player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="videoMeta">
          <h1 className="videoTitle">{videoSelected?.title}</h1>
          <p className="videoDesc">{videoSelected?.description}</p>
        </div>
      </div>

      <FeedbackSection videoId={videoId!} />
    </div>
  );
}