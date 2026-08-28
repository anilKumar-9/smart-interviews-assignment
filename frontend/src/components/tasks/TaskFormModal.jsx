import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Calendar, AlertCircle } from 'lucide-react';

export const TaskFormModal = ({ isOpen, onClose, onSubmit, initialTask = null, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setStatus(initialTask.status || 'Todo');
      setPriority(initialTask.priority || 'Medium');
      if (initialTask.dueDate) {
        // Format YYYY-MM-DD for date input
        const d = new Date(initialTask.dueDate);
        setDueDate(d.toISOString().split('T')[0]);
      } else {
        setDueDate('');
      }
    } else {
      setTitle('');
      setDescription('');
      setStatus('Todo');
      setPriority('Medium');
      setDueDate('');
    }
    setError('');
  }, [initialTask, isOpen]);

  const handlePresetDate = (daysOffset) => {
    if (daysOffset === null) {
      setDueDate('');
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    setDueDate(d.toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    if (title.length > 150) {
      setError('Title cannot exceed 150 characters');
      return;
    }

    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Edit Task' : 'Create New Task'}
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Task Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-title">
            Task Title <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className="form-input"
            placeholder="e.g., Implement authentication middleware"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={150}
            autoFocus
          />
        </div>

        {/* Task Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-desc">
            Description <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
          </label>
          <textarea
            id="task-desc"
            className="form-textarea"
            rows={3}
            placeholder="Add relevant details, requirements, or steps..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
          />
        </div>

        {/* Status and Priority Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.125rem',
          }}
        >
          {/* Status */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="task-status">
              Status
            </label>
            <select
              id="task-status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="task-priority">
              Priority
            </label>
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Due Date & Shortcuts */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-due-date">
            Due Date
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="task-due-date"
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Quick Date Presets */}
          <div
            style={{
              display: 'flex',
              gap: '0.375rem',
              marginTop: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => handlePresetDate(0)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate(1)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate(3)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              +3 Days
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate(7)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              +1 Week
            </button>
            {dueDate && (
              <button
                type="button"
                onClick={() => handlePresetDate(null)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--danger)' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Modal Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
