import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import { Save } from 'lucide-react';
import useTasks from '../hooks/useTasks';
import taskSchema from '../utils/taskSchema';

const priorityOptions = [
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'high',
    label: 'High',
  },
];

const categoryOptions = [
  {
    value: 'study',
    label: 'Study',
  },
  {
    value: 'work',
    label: 'Work',
  },
  {
    value: 'personal',
    label: 'Personal',
  },
  {
    value: 'health',
    label: 'Health',
  },
  {
    value: 'finance',
    label: 'Finance',
  },
];

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { tasks } = useTasks();

  const task = tasks.find((task) => task.id === taskId);

  if (!task)
    return (
      <div>
        <h1 className="text-2xl font-semibold to-slate-800 dark:text-slate-100">
          Task Not Found
        </h1>
        <p className="mt-2 mb-2 text-slate-500 dark:text-slate-400">
          The task you are trying to edit does not exist
        </p>
        <Button onClick={() => navigate('/tasks')}>Back to Tasks</Button>
      </div>
    );

  return <EditTaskForm task={task} />;
}

function EditTaskForm({ task }) {
  const { updateTask } = useTasks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
    },
  });

  function onSubmit(formData) {
    updateTask(task.id, formData);
    navigate(`/tasks/${task.id}`);
  }

  function handleCancel() {
    navigate(`/tasks/${task.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Edit Task
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Update the information of your task.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
      >
        <Input
          label="Task Title"
          placeholder="Enter task title"
          {...register('title')}
          error={errors.title?.message}
        />

        <Textarea
          label="Description"
          placeholder="Describe your task..."
          {...register('description')}
          error={errors.description?.message}
        />

        <div className=" grid gap-5 sm:grid-cols-2">
          <Select
            label="Priority"
            options={priorityOptions}
            {...register('priority')}
            error={errors.priority?.message}
          />

          <Select
            label="Category"
            options={categoryOptions}
            {...register('category')}
            error={errors.category?.message}
          />

          <Input
            label="Due Date"
            type="date"
            {...register('dueDate')}
            error={errors.dueDate?.message}
          />
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
