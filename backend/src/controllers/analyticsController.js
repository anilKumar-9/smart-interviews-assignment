import Task from '../models/Task.js';

// @desc    Get comprehensive task analytics & insights
// @route   GET /api/analytics
// @access  Private
const getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch all user's tasks
    const tasks = await Task.find({ user: userId });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Done').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;
    const todoTasks = tasks.filter((t) => t.status === 'Todo').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;

    const completionPercentage = totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

    // Priority breakdown
    const highPriority = tasks.filter((t) => t.priority === 'High').length;
    const mediumPriority = tasks.filter((t) => t.priority === 'Medium').length;
    const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

    // Overdue and upcoming calculations
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const inSevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < startOfToday && t.status !== 'Done'
    ).length;

    const dueTodayTasks = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) >= startOfToday &&
        new Date(t.dueDate) <= endOfToday &&
        t.status !== 'Done'
    ).length;

    const upcomingTasks = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) > endOfToday &&
        new Date(t.dueDate) <= inSevenDays &&
        t.status !== 'Done'
    ).length;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage,
        statusBreakdown: {
          todo: todoTasks,
          inProgress: inProgressTasks,
          done: completedTasks,
        },
        priorityBreakdown: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
        timeline: {
          overdue: overdueTasks,
          dueToday: dueTodayTasks,
          upcoming: upcomingTasks,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getTaskAnalytics,
};
