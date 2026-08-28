import React, { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { FilterBar } from '../components/tasks/FilterBar';
import { TaskList } from '../components/tasks/TaskList';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { TaskFormModal } from '../components/tasks/TaskFormModal';
import { Pagination } from '../components/tasks/Pagination';
import { Modal } from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const TasksPage = () => {
  const { addToast } = useToast();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering & Pagination State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    totalTasks: 0,
    totalPages: 1,
    currentPage: 1,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [modalSubmitting, setModalSubmitting] = useState(false);

  // Debounced search trigger
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page to 1 when search or filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, priorityFilter, sortBy]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await taskService.getTasks({
        status: statusFilter,
        priority: priorityFilter,
        search: debouncedSearch,
        sort: sortBy,
        page: viewMode === 'board' ? 1 : page,
        // Board mode fetches up to 100 tasks to distribute in columns
        limit: viewMode === 'board' ? 100 : limit,
      });

      setTasks(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, debouncedSearch, sortBy, page, limit, viewMode]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create or Update task handler
  const handleFormSubmit = async (taskPayload) => {
    try {
      setModalSubmitting(true);
      if (editingTask) {
        await taskService.updateTask(editingTask._id, taskPayload);
        addToast('Task updated successfully!', 'success');
      } else {
        await taskService.createTask(taskPayload);
        addToast('New task added successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      addToast(err.message || 'Failed to save task', 'error');
    } finally {
      setModalSubmitting(false);
    }
  };

  // Status Change handler
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      addToast(`Status updated to ${newStatus}`, 'success');
      fetchTasks();
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Delete task handler
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await taskService.deleteTask(deleteCandidate._id);
      addToast('Task deleted successfully', 'success');
      setDeleteCandidate(null);
      fetchTasks();
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.35rem' }}>Task Workspace</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          Create, track, filter, sort, and organize your tasks effortlessly.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCreateModal={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
        totalTasks={pagination.totalTasks}
      />

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
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button onClick={fetchTasks} className="btn btn-secondary btn-sm">
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Active View: List View or Kanban Board */}
      {viewMode === 'list' ? (
        <>
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={(task) => setDeleteCandidate(task)}
            onStatusChange={handleStatusChange}
          />

          {/* Pagination controls for List view */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalTasks={pagination.totalTasks}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
          onDelete={(task) => setDeleteCandidate(task)}
          onStatusChange={handleStatusChange}
        />
      )}

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
        title="Delete Task"
        maxWidth="420px"
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{deleteCandidate?.title}"</strong>? This cannot be undone.
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
