import React from 'react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { Calendar, Edit3, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isDone = task.status === 'Done';

  // Format Due Date
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
      className="glass-card animate-fade-in"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        opacity: isDone ? 0.82 : 1,
        transition: 'var(--transition)',
        borderLeft: isDone
          ? '4px solid var(--success)'
          : isOverdue
          ? '4px solid var(--danger)'
          : '4px solid var(--border-color)',
      }}
    >
      <div>
        {/* Top Badges Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        {/* Task Title */}
        <h4
          style={{
            fontSize: '1.05rem',
            marginBottom: '0.5rem',
            lineHeight: 1.35,
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
          }}
        >
          {task.title}
        </h4>

        {/* Task Description */}
        {task.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: '1rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Area: Due Date & Actions */}
      <div
        style={{
          marginTop: '1rem',
          paddingTop: '0.875rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {/* Due Date Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            color: isOverdue ? 'var(--danger)' : 'var(--text-muted)',
            fontWeight: isOverdue ? 600 : 400,
          }}
          title={isOverdue ? 'Task deadline is overdue' : 'Due date'}
        >
          <Calendar size={14} />
          <span>{formattedDate}</span>
          {isOverdue && (
            <span style={{ fontSize: '0.75rem', padding: '1px 4px', borderRadius: '4px', backgroundColor: 'var(--danger-light)' }}>
              Overdue
            </span>
          )}
        </div>

        {/* Actions Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {/* Quick Status Selector */}
          <select
            className="form-select"
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              width: 'auto',
            }}
            title="Quick update status"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="btn btn-ghost btn-icon"
            style={{ padding: '0.35rem' }}
            title="Edit task"
          >
            <Edit3 size={15} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task)}
            className="btn btn-ghost btn-icon"
            style={{ padding: '0.35rem', color: 'var(--danger)' }}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
