type Props = {
  page: number;
  totalPages: number;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function Pagination({ page, totalPages, onPrev, onNext, canPrev, canNext }: Props) {
  return (
    <div className="pagination">
      <button className="btn" onClick={onPrev} disabled={!canPrev}>
        ← Anterior
      </button>
      <span className="muted">
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>
      <button className="btn" onClick={onNext} disabled={!canNext}>
        Próxima →
      </button>
    </div>
  );
}