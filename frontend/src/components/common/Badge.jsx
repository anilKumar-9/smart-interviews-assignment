import React from 'react';
import { Circle, Clock, CheckCircle2, AlertCircle, AlertTriangle, ArrowDown } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-todo';
  let Icon = Circle;

  if (status === 'In Progress') {
    badgeClass = 'badge-in-progress';
    Icon = Clock;
  } else if (status === 'Done') {
    badgeClass = 'badge-done';
    Icon = CheckCircle2;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <Icon size={13} strokeWidth={2.5} />
      <span>{status}</span>
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  let badgeClass = 'badge-medium';
  let Icon = AlertTriangle;

  if (priority === 'High') {
    badgeClass = 'badge-high';
    Icon = AlertCircle;
  } else if (priority === 'Low') {
    badgeClass = 'badge-low';
    Icon = ArrowDown;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <Icon size={13} strokeWidth={2.5} />
      <span>{priority}</span>
    </span>
  );
};
