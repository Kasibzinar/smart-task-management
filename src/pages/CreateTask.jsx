import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';

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

function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      category: '',
    },
  });

  function onSubmit(formData) {
    addTask(formData);
    navigate('/tasks');
  }

  function handleCancel() {
    navigate('/tasks');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Create New Task
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Add a new task to your task list.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
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

        <div className="grid gap-5 sm:grid-cols-2">
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
        </div>

        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
        />

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>

          <Button type="submit">
            <Plus size={18} />
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
