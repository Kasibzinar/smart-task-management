import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useTasks from '../hooks/useTasks';

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { tasks } = useTasks();

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Task Not Found
        </h1>

        <p className="mt-2 text-slate-500">
          The task you are looking for does not exist.
        </p>

        <Button onClick={() => navigate('/tasks')}>Back to Tasks</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Task Details
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {task.title}
          </h1>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Description
          </h2>

          <p className="mt-2 text-slate-700 dark:text-slate-200">
            {task.description || 'No description provided.'}
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 ">
              Priority
            </p>

            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Category
            </p>

            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {task.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Due Date
            </p>

            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {task.dueDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>

            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {task.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Created Date
            </p>

            <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">
              {new Date(task.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 border-t border-slate-200 pt-5">
          <Button
            variant="primary"
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
          >
            Edit Task
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              navigate('/tasks');
            }}
          >
            Back to tasks
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TaskDetails;
