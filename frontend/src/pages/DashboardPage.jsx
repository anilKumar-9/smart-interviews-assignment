import React, { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';
import { taskService } from '../services/taskService';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';
import { TaskList } from '../components/tasks/TaskList';
import { TaskFormModal } from '../components/tasks/TaskFormModal';
import { Modal } from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { RefreshCw, ListTodo, Plus, AlertCircle } from 'lucide-react';

export const DashboardPage = ({ onNavigateToTasks }) => {
  const { addToast } = useToast();

  const [analytics, setAnalytics] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [analyticsData, tasksData] = await Promise.all([
        analyticsService.getAnalytics(),
        taskService.getTasks({ limit: 5, sort: 'createdAt_desc' }),
      ]);
      setAnalytics(analyticsData);
      setRecentTasks(tasksData.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle Create / Edit submit
  const handleFormSubmit = async (taskPayload) => {
    try {
      setModalSubmitting(true);
      if (editingTask) {
        await taskService.updateTask(editingTask._id, taskPayload);
        addToast('Task updated successfully!', 'success');
      } else {
        await taskService.createTask(taskPayload);
        addToast('New task created!', 'success');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchDashboardData();
    } catch (err) {
      addToast(err.message || 'Failed to save task', 'error');
    } finally {
      setModalSubmitting(false);
    }
  };

  // Fast status toggle
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      addToast(`Status updated to ${newStatus}`, 'success');
      fetchDashboardData();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Delete task
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await taskService.deleteTask(deleteCandidate._id);
      addToast('Task removed', 'success');
      setDeleteCandidate(null);
      fetchDashboardData();
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Error state */}
      {error && (
        <div
          className="glass-card"
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--danger-light)',
            borderColor: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button onClick={fetchDashboardData} className="btn btn-secondary btn-sm">
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Analytics Dashboard */}
      <AnalyticsDashboard
        analytics={analytics}
        onNavigateToTasks={onNavigateToTasks}
        onOpenCreateModal={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      {/* Recent Tasks Widget */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Recent Tasks</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Your latest activity and current working items
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={15} />
              <span>Add Task</span>
            </button>
            <button onClick={onNavigateToTasks} className="btn btn-primary btn-sm">
              <ListTodo size={15} />
              <span>Manage All Tasks</span>
            </button>
          </div>
        </div>

        <TaskList
          tasks={recentTasks}
          loading={loading}
          onEdit={(task) => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
          onDelete={(task) => setDeleteCandidate(task)}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Task Form Modal (Create / Edit) */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
        loading={modalSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Confirm Deletion"
        maxWidth="420px"
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
          Are you sure you want to permanently delete{' '}
          <strong style={{ color: 'var(--text-primary)' }}>"{deleteCandidate?.title}"</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={() => setDeleteCandidate(null)} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={confirmDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};
