import { useState } from "react";
import { getFeedbacks } from "../services/feedbacks";
import FeedbackModal from "./FeedbackModal";
import { usePaginatedFetch } from "../hooks/usePagedVideos";

type Props = {
  videoId: string;
};

type Feedback = {
  id: string;
  username: string;
  comment: string;
  rating: number;
};

export default function FeedbackSection({ videoId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: feedbacks, page, totalPages, total, loading, goToPage, refresh } =
    usePaginatedFetch<Feedback>(
      (page, limit) => getFeedbacks({ videoId, page, limit }),
      { pageSize: 10, deps: [videoId] }
    );
  console.log("🚀 ~ FeedbackSection ~ feedbacks:", feedbacks)

  return (
    <div className="feedbackSection">
      <div className="feedbackSectionHeader">
        <h2 className="feedbackSectionTitle">
          Feedbacks <span className="muted">({total})</span>
        </h2>

        <div className="feedbackSectionActions">
          <button className="btn primary" onClick={() => setIsModalOpen(true)}>
            + Deixar feedback
          </button>

          <div className="pagination mini">
            <button
              className="btn"
              disabled={page <= 1 || loading}
              onClick={() => goToPage(page - 1)}
            >
              ← Anterior
            </button>
            <span className="muted small">
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>
            <button
              className="btn"
              disabled={page >= totalPages || loading}
              onClick={() => goToPage(page + 1)}
            >
              Próxima →
            </button>
          </div>
        </div>
      </div>

      <div className="feedbackList">
        {loading ? (
          <p className="muted small">Carregando…</p>
        ) : feedbacks.length === 0 ? (
          <p className="muted small">Nenhum feedback ainda. Seja o primeiro!</p>
        ) : (
          feedbacks.map((f) => (
            <div key={f.id} className="feedbackItem">
              <div className="feedbackTop">
                <strong>{f.username}</strong>
                <div className="stars">{renderStars(f.rating)}</div>
              </div>
              <p className="feedbackComment">{f.comment}</p>
            </div>
          ))
        )}
      </div>

      <FeedbackModal
        open={isModalOpen}
        videoId={videoId}
        onClose={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
    </div>
  );
}

function renderStars(rating: number) {
  return [1, 2, 3, 4, 5].map((n) => (
    <span key={n} className={n <= rating ? "starFull" : "starEmpty"}>
      ★
    </span>
  ));
}