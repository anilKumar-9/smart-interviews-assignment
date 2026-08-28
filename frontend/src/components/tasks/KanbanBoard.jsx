import React from 'react';
import { TaskCard } from './TaskCard';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';

export const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const columns = [
    {
      id: 'Todo',
      title: 'To Do',
      icon: Circle,
      color: '#6b7280',
      bgColor: 'rgba(107, 114, 128, 0.08)',
      borderColor: 'rgba(107, 114, 128, 0.2)',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      icon: Clock,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.08)',
      borderColor: 'rgba(59, 130, 246, 0.25)',
    },
    {
      id: 'Done',
      title: 'Completed',
      icon: CheckCircle2,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.25)',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start',
      }}
    >
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        const Icon = col.icon;

        return (
          <div
            key={col.id}
            style={{
              backgroundColor: col.bgColor,
              border: `1px solid ${col.borderColor}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minHeight: '400px',
            }}
          >
            {/* Column Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: `1px solid ${col.borderColor}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={18} color={col.color} strokeWidth={2.5} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{col.title}</h3>
              </div>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-card)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: col.color,
                  border: `1px solid ${col.borderColor}`,
                }}
              >
                {colTasks.length}
              </span>
            </div>

            {/* Task Cards in Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {colTasks.length === 0 ? (
                <div
                  style={{
                    padding: '2.5rem 1rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    border: '1px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  No {col.title.toLowerCase()} tasks
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
