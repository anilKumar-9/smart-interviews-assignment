import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalTasks = 0,
  limit = 10,
  onPageChange,
  onLimitChange,
}) => {
  if (totalTasks === 0) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalTasks);

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginTop: '1.75rem',
        padding: '0.75rem 0',
      }}
    >
      {/* Showing count indicator */}
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{startItem}</strong> to{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{endItem}</strong> of{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{totalTasks}</strong> tasks
      </div>

      {/* Pagination Controls & Items per page */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Limit Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Per page:</span>
          <select
            className="form-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8125rem', width: 'auto' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Page Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn btn-secondary btn-icon"
            style={{ padding: '0.35rem 0.5rem' }}
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {pages.map((p) => {
            // Keep window of pages if totalPages is large
            if (
              totalPages > 7 &&
              p !== 1 &&
              p !== totalPages &&
              Math.abs(p - currentPage) > 2
            ) {
              if (Math.abs(p - currentPage) === 3) {
                return (
                  <span key={p} style={{ padding: '0 0.25rem', color: 'var(--text-muted)' }}>
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                style={{
                  minWidth: '32px',
                  height: '32px',
                  padding: '0 0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  backgroundColor: currentPage === p ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: currentPage === p ? 'var(--primary-contrast)' : 'var(--text-secondary)',
                  borderColor: currentPage === p ? 'var(--primary)' : 'var(--border-color)',
                }}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn btn-secondary btn-icon"
            style={{ padding: '0.35rem 0.5rem' }}
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
