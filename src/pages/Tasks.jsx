import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/ui/SearchBox';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import useTasks from '../hooks/useTasks';
import useCategories from '../hooks/useCategories';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { useState } from 'react';
import Modal from '../components/ui/Modal';

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: '', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function Tasks() {
  const navigate = useNavigate();
  const {
    tasks,
    deleteTask,
    toggleTaskStatus,
    filters,
    updateFilter,
    filteredTasks,
    clearFilters,
  } = useTasks();

  const { categories } = useCategories();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((category) => ({
      value: category.name,
      label: category.name,
    })),
  ];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Tasks
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your tasks here.
        </p>
      </div>

      <div className="mt-6 space-y-4 ">
        <SearchBox
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Search Tasks..."
        />

        <div
          className="grid
         gap-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          <Select
            label="Status"
            value={filters.status}
            options={statusOptions}
            onChange={(e) => updateFilter('status', e.target.value)}
          />

          <Select
            label="Priority"
            value={filters.priority}
            options={priorityOptions}
            onChange={(e) => updateFilter('priority', e.target.value)}
          />

          <Select
            label="Category"
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            options={categoryOptions}
          />

          <Input
            label="Due Date"
            value={filters.dueDate}
            onChange={(e) => updateFilter('dueDate', e.target.value)}
            type="date"
          />
        </div>
        <div className="flex gap-2 items-center justify-end">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filteredTasks.length} found
          </p>
          <Button variant="ghost" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="mt-8 text-slate-500 dark:text-slate-400">No tasks yet.</p>
      ) : filteredTasks.length === 0 ? (
        <p className="mt-6 text-slate-500">No tasks match your filters</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {task.title}
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {task.description}
              </p>

              <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300  sm:grid-cols-2">
                {task.priority && <p>Priority: {task.priority}</p>}

                {task.category && <p>Category: {task.category}</p>}

                {task.dueDate && <p>Due Date: {task.dueDate}</p>}

                <p>Status: {task.status}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 sm:grid-cols-2">
                <Button onClick={() => navigate(`/tasks/${task.id}`)}>
                  View
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                >
                  Edit
                </Button>

                <Button onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === 'pending'
                    ? 'Mark Completed'
                    : 'Mark Pending'}
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    setTaskToDelete(task);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Delete Task
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete this category?
          </p>

          {taskToDelete && (
            <p className="mt-3 font-medium text-slate-800 dark:text-slate-200">
              "{taskToDelete.title}"
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setTaskToDelete(null);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                deleteTask(taskToDelete.id);
                setShowDeleteModal(false);
                setTaskToDelete(null);
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Tasks;
