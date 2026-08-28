import React from 'react';
import { Search, X, SlidersHorizontal, LayoutGrid, List, Plus } from 'lucide-react';

export const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onOpenCreateModal,
  totalTasks = 0,
}) => {
  const statuses = ['All', 'Todo', 'In Progress', 'Done'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      {/* Top row: Search input + View Switcher + Add Task Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.875rem',
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 300px',
            minWidth: '240px',
          }}
        >
          <Search
            size={18}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search tasks by title or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem', paddingRight: search ? '2.5rem' : '0.875rem' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
              }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* View Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-input)',
              padding: '3px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <button
              onClick={() => setViewMode('list')}
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.35rem 0.65rem' }}
              title="List View"
            >
              <List size={16} />
              <span className="view-mode-text">List</span>
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`btn btn-sm ${viewMode === 'board' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.35rem 0.65rem' }}
              title="Kanban Board View"
            >
              <LayoutGrid size={16} />
              <span className="view-mode-text">Board</span>
            </button>
          </div>

          {/* Add Task Button */}
          <button onClick={onOpenCreateModal} className="btn btn-primary">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Filter Chips & Sorting Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        {/* Status Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500, marginRight: '0.25rem' }}>
            Status:
          </span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'var(--transition)',
                backgroundColor: statusFilter === s ? 'var(--primary)' : 'var(--bg-input)',
                color: statusFilter === s ? 'var(--primary-contrast)' : 'var(--text-secondary)',
                borderColor: statusFilter === s ? 'var(--primary)' : 'var(--border-color)',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Priority & Sort Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Priority Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>Priority:</span>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Priorities' : p}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>Sort by:</span>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="createdAt_desc">Newest Created</option>
              <option value="createdAt_asc">Oldest Created</option>
              <option value="dueDate_asc">Due Date (Earliest)</option>
              <option value="dueDate_desc">Due Date (Latest)</option>
              <option value="priority_high">Priority (High to Low)</option>
              <option value="title_asc">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .view-mode-text { display: none; }
        }
      `}</style>
    </div>
  );
};
