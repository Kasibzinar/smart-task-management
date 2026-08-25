import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header onMenuClick={openSidebar} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="min-w-0 flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
