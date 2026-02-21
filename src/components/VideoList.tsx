import { useCallback } from "react";
import type { Video } from "../types";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../context/VideoContext";

type Props = {
  videos: Video[];
  page: number;
  onVideoClick?: (video: Video) => void;
};

export default function VideoList({ videos, page }: Props) {
  const { setVideoSelected } = useVideoContext();
  const navigate = useNavigate();

  const onVideoClick = useCallback(
    (video: Video) => {
      setVideoSelected(video);
      navigate(`/video/${video.id}`);
    },
    [navigate, setVideoSelected],
  );

  return (
    <section className="grid">
      {videos.map((v, i) => (
        <article
          key={`${page}-${v.id}`}
          className="card cardEnter"
          style={{ animationDelay: `${(i % 12) * 35}ms` }}
          onClick={() => onVideoClick?.(v)}
        >
          <img className="thumb" src={v.thumbnailUrl} alt={v.title} />
          <div className="cardBody">
            <h3 className="cardTitle">{v.title}</h3>
            <p className="cardDesc">{v.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
