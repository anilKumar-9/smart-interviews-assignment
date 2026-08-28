import React from 'react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { TaskCardSkeleton } from '../common/Skeleton';
import { Calendar, Edit3, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

export const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {[...Array(6)].map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Clock size={30} />
        </div>
        <h3 style={{ fontSize: '1.25rem' }}>No tasks found</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '0.9375rem' }}>
          Try clearing search filters or create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {tasks.map((task) => {
        const isDone = task.status === 'Done';
        let formattedDate = 'No deadline';
        let isOverdue = false;

        if (task.dueDate) {
          const d = new Date(task.dueDate);
          formattedDate = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          const now = new Date();
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          if (d < startOfToday && !isDone) {
            isOverdue = true;
          }
        }

        return (
          <div
            key={task._id}
            className="glass-card animate-fade-in"
            style={{
              padding: '1.125rem 1.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              borderLeft: isDone
                ? '4px solid var(--success)'
                : isOverdue
                ? '4px solid var(--danger)'
                : '4px solid var(--border-color)',
            }}
          >
            {/* Left section: Checkbox + Title + Description */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 350px' }}>
              <button
                onClick={() => onStatusChange(task._id, isDone ? 'Todo' : 'Done')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isDone ? 'var(--success)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  marginTop: '2px',
                  transition: 'transform 0.15s ease',
                }}
                title={isDone ? 'Mark as Todo' : 'Mark as Done'}
              >
                {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: isDone ? 'line-through' : 'none',
                      color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                    }}
                  >
                    {task.title}
                  </h4>
                  <PriorityBadge priority={task.priority} />
                </div>

                {task.description && (
                  <p
                    style={{
                      fontSize: '0.84375rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.25rem',
                      lineHeight: 1.4,
                      maxWidth: '650px',
                    }}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right section: Status + Due date + Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <StatusBadge status={task.status} />

              {/* Due Date */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  color: isOverdue ? 'var(--danger)' : 'var(--text-muted)',
                  fontWeight: isOverdue ? 600 : 400,
                  minWidth: '110px',
                }}
              >
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={() => onEdit(task)}
                  className="btn btn-ghost btn-icon"
                  style={{ padding: '0.35rem' }}
                  title="Edit task"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDelete(task)}
                  className="btn btn-ghost btn-icon"
                  style={{ padding: '0.35rem', color: 'var(--danger)' }}
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
