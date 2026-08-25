import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      status: 'pending',
      createdDate: new Date().toISOString(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  function toggleTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
            }
          : task,
      ),
    );
  }

  function updateTask(taskId, updatedData) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updatedData, updatedDate: new Date().toISOString() }
          : task,
      ),
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskStatus, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
