import StatCard from '../components/ui/StatCard';
import useTasks from '../hooks/useTasks';

function Dashboard() {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split('T')[0];

  const totalTasks = tasks.length;

  const complettedTasks = tasks.filter(
    (task) => task.status === 'completed',
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate && task.dueDate < today && task.status !== 'completed',
  ).length;

  const tasksDueToday = tasks.filter((task) => task.dueDate === today).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 ">
        Dashboard
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="Completed" value={complettedTasks} />
        <StatCard title="Pending" value={pendingTasks} />
        <StatCard title="Overdue" value={overdueTasks} />
        <StatCard title="Due Today" value={tasksDueToday} />
      </div>
    </div>
  );
}

export default Dashboard;
