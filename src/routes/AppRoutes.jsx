import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Categories from '../pages/Categories';
import Calendar from '../pages/Calendar';
import Settings from '../pages/Settings';
import Layout from '../components/layout/Layout';
import TaskDetails from '../pages/TaskDetails';
import NotFound from '../pages/NotFound';
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:taskId" element={<TaskDetails />} />
        <Route path="tasks/:taskId/edit" element={<EditTask />} />
        <Route path="tasks/new" element={<CreateTask />} />
        <Route path="categories" element={<Categories />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
