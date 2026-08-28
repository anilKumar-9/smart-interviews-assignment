import React from 'react';
import { StatCard } from './StatCard';
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  AlertTriangle,
  Flame,
  CalendarClock,
  Sparkles,
} from 'lucide-react';

export const AnalyticsDashboard = ({ analytics, onNavigateToTasks, onOpenCreateModal }) => {
  if (!analytics) return null;

  const {
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0,
    completionPercentage = 0,
    statusBreakdown = { todo: 0, inProgress: 0, done: 0 },
    priorityBreakdown = { high: 0, medium: 0, low: 0 },
    timeline = { overdue: 0, dueToday: 0, upcoming: 0 },
  } = analytics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.12), rgba(202, 138, 4, 0.05))',
          borderColor: 'rgba(250, 204, 21, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#facc15', marginBottom: '0.35rem' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Performance Overview
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Analytics & Insights
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.9375rem' }}>
            Monitor your task velocity, completion rates, priority distribution, and upcoming deadlines at a glance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={onNavigateToTasks} className="btn btn-secondary">
            <ListTodo size={17} />
            <span>View All Tasks</span>
          </button>
          <button onClick={onOpenCreateModal} className="btn btn-primary">
            <span>+ Create Task</span>
          </button>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={ListTodo}
          color="#facc15"
          subtitle="All tasks created"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          color="#10b981"
          subtitle={`${completionPercentage}% of total tasks`}
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={Clock}
          color="#f59e0b"
          subtitle="Todo & In Progress"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionPercentage}%`}
          icon={TrendingUp}
          color="#facc15"
          subtitle={
            completionPercentage >= 70
              ? 'Great momentum!'
              : completionPercentage >= 40
              ? 'Steady progress'
              : 'Tasks awaiting action'
          }
        />
      </div>

      {/* Breakdown Section: Status & Priority Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Status Distribution */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Status Breakdown</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Distribution of tasks by state</p>
            </div>
            <span className="badge badge-done" style={{ fontSize: '0.8125rem' }}>
              {completedTasks}/{totalTasks} Done
            </span>
          </div>

          {/* Multi-segment Progress Bar */}
          <div
            style={{
              height: '14px',
              width: '100%',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              display: 'flex',
              marginBottom: '1.5rem',
            }}
          >
            {totalTasks > 0 ? (
              <>
                <div
                  title={`Todo: ${statusBreakdown.todo}`}
                  style={{
                    width: `${(statusBreakdown.todo / totalTasks) * 100}%`,
                    backgroundColor: '#6b7280',
                    transition: 'width 0.4s ease',
                  }}
                />
                <div
                  title={`In Progress: ${statusBreakdown.inProgress}`}
                  style={{
                    width: `${(statusBreakdown.inProgress / totalTasks) * 100}%`,
                    backgroundColor: '#3b82f6',
                    transition: 'width 0.4s ease',
                  }}
                />
                <div
                  title={`Done: ${statusBreakdown.done}`}
                  style={{
                    width: `${(statusBreakdown.done / totalTasks) * 100}%`,
                    backgroundColor: '#10b981',
                    transition: 'width 0.4s ease',
                  }}
                />
              </>
            ) : (
              <div style={{ width: '100%', backgroundColor: 'var(--border-color)' }} />
            )}
          </div>

          {/* Status Breakdown Legend & Counts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#6b7280' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Todo</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{statusBreakdown.todo}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>In Progress</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{statusBreakdown.inProgress}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Completed</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{statusBreakdown.done}</span>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Priority Distribution</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Breakdown by urgency level</p>
            </div>
            <Flame size={20} color="#ef4444" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {/* High Priority Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>High Priority</span>
                <span style={{ fontWeight: 700 }}>
                  {priorityBreakdown.high} ({totalTasks > 0 ? Math.round((priorityBreakdown.high / totalTasks) * 100) : 0}%)
                </span>
              </div>
              <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${totalTasks > 0 ? (priorityBreakdown.high / totalTasks) * 100 : 0}%`,
                    backgroundColor: '#ef4444',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
            </div>

            {/* Medium Priority Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Medium Priority</span>
                <span style={{ fontWeight: 700 }}>
                  {priorityBreakdown.medium} ({totalTasks > 0 ? Math.round((priorityBreakdown.medium / totalTasks) * 100) : 0}%)
                </span>
              </div>
              <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${totalTasks > 0 ? (priorityBreakdown.medium / totalTasks) * 100 : 0}%`,
                    backgroundColor: '#f59e0b',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
            </div>

            {/* Low Priority Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600 }}>Low Priority</span>
                <span style={{ fontWeight: 700 }}>
                  {priorityBreakdown.low} ({totalTasks > 0 ? Math.round((priorityBreakdown.low / totalTasks) * 100) : 0}%)
                </span>
              </div>
              <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${totalTasks > 0 ? (priorityBreakdown.low / totalTasks) * 100 : 0}%`,
                    backgroundColor: '#3b82f6',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deadline Health Alerts & Timelines */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{timeline.overdue}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Overdue Tasks</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--warning-light)',
              color: 'var(--warning)',
            }}
          >
            <CalendarClock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{timeline.dueToday}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Due Today</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--info-light)',
              color: 'var(--info)',
            }}
          >
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{timeline.upcoming}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Due Next 7 Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};
