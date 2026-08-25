import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';

function useTasks() {
  const context = useContext(TaskContext);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    dueDate: '',
  });

  if (!context) throw new Error('useTasks must be used inside TaskProvider');

  const { tasks } = context;

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  }

  function clearFilters() {
    setFilters({
      search: '',
      status: '',
      priority: '',
      category: '',
      dueDate: '',
    });
  }

  const filteredTasks = tasks.filter((task) => {
    const searchText = filters.search.toLowerCase();

    const matchesSearch = task.title.toLowerCase().includes(searchText);
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesPriority =
      !filters.priority || task.priority === filters.priority;
    const matchesCategory =
      !filters.category || task.category === filters.category;
    const matchesDueDate = !filters.dueDate || task.dueDate === filters.dueDate;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory &&
      matchesDueDate
    );
  });

  return { ...context, filters, updateFilter, filteredTasks, clearFilters };
}

export default useTasks;
