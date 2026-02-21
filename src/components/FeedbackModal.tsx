import { useEffect, useMemo, useRef, useState } from "react";
import { registerFeedback } from "../services/feedbacks";

type Props = {
  open: boolean;
  onClose: () => void;
  videoId: string;
};

type Status = "idle" | "loading" | "success" | "error";

const MAX_COMMENT = 500;

export default function FeedbackModal({ open, onClose, videoId }: Props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; comment?: string }>({});

  const nameRef = useRef<HTMLInputElement | null>(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Nome é obrigatório.";
    if (!comment.trim()) next.comment = "Comentário é obrigatório.";
    else if (comment.trim().length < 10)
      next.comment = "Comentário deve ter ao menos 10 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await registerFeedback({ comment, rating, username: name, videoId });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    setName("");
    setComment("");
    setRating(5);
    setStatus("idle");
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  const isDisabled = useMemo(
    () => !name.trim() || !comment.trim() || isLoading,
    [name, comment, isLoading]
  );

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fm-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
    >
      <div className="modal">
        {isSuccess ? (
          <SuccessView onClose={handleClose} />
        ) : (
          <>
            <h2 className="modalTitle" id="fm-title">
              Deixar feedback
            </h2>
            <p className="modalSubtitle">
              Escreva seu comentário e dê uma nota de 1 a 5.
            </p>

            {isError && (
              <div
                className="feedbackItem"
                role="alert"
                style={{
                  marginBottom: 14,
                  borderColor: "rgba(239,68,68,0.4)",
                  background: "rgba(239,68,68,0.08)",
                }}
              >
                <span className="muted small">
                  ⚠ Algo deu errado ao enviar. Tente novamente.
                </span>
              </div>
            )}

            <div className="formGrid">
              <div className="label">
                <span className="labelText">Seu nome</span>
                <input
                  ref={nameRef}
                  className="input"
                  value={name}
                  placeholder="Ex: Paulo"
                  disabled={isLoading}
                  style={errors.name ? { borderColor: "rgba(239,68,68,0.6)" } : undefined}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                />
                {errors.name && (
                  <span
                    className="small"
                    role="alert"
                    style={{ color: "rgba(239,68,68,0.85)" }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="label">
                <span className="labelText">Nota</span>
                <StarRating value={rating} onChange={setRating} disabled={isLoading} />
              </div>

              <div className="label full">
                <span className="labelText">Comentário</span>
                <textarea
                  className="textarea"
                  value={comment}
                  placeholder="Escreva seu feedback…"
                  maxLength={MAX_COMMENT}
                  disabled={isLoading}
                  style={errors.comment ? { borderColor: "rgba(239,68,68,0.6)" } : undefined}
                  onChange={(e) => {
                    setComment(e.target.value);
                    if (errors.comment) setErrors((p) => ({ ...p, comment: undefined }));
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {errors.comment ? (
                    <span
                      className="small"
                      role="alert"
                      style={{ color: "rgba(239,68,68,0.85)" }}
                    >
                      {errors.comment}
                    </span>
                  ) : (
                    <span className="muted small">
                      <strong>Ctrl/⌘ + Enter</strong> para enviar
                    </span>
                  )}
                  <span className="muted small">
                    {comment.length}/{MAX_COMMENT}
                  </span>
                </div>
              </div>
            </div>

            <div className="modalActions">
              <button className="btn" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </button>
              <button
                className="btn primary"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                {isLoading ? <Spinner /> : "Enviar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="starPicker" role="radiogroup" aria-label="Nota">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hovered || value);
        return (
          <button
            key={n}
            type="button"
            className={`starBtn ${active ? "active" : ""}`}
            onClick={() => !disabled && onChange(n)}
            onMouseEnter={() => !disabled && setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
            disabled={disabled}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes fm-spin { to { transform: rotate(360deg) } }`}</style>
      <span
        aria-label="Carregando"
        style={{
          display: "inline-block",
          width: "1rem",
          height: "1rem",
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          animation: "fm-spin .6s linear infinite",
        }}
      />
    </>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          background: "rgba(34,197,94,0.12)",
          border: "1px solid rgba(34,197,94,0.4)",
          color: "rgba(34,197,94,0.9)",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✓
      </div>
      <div>
        <h3 className="modalTitle" style={{ marginBottom: 6 }}>
          Feedback enviado!
        </h3>
        <p className="muted" style={{ margin: 0 }}>
          Obrigado pela sua opinião. Ela nos ajuda a melhorar.
        </p>
      </div>
      <button className="btn primary" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}