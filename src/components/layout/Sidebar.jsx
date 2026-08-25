import {
  CalendarDays,
  CheckSquare,
  Folder,
  Home,
  Settings,
  X,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const pageLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Tasks', path: 'tasks', icon: CheckSquare },
    { name: 'Categories', path: 'categories', icon: Folder },
    { name: 'Calendar', path: 'calendar', icon: CalendarDays },
    { name: 'Settings', path: 'settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-60 border-r
          border-slate-200 bg-white p-4
          transition-transform duration-200
          dark:border-slate-800 dark:bg-slate-900

          md:sticky md:top-0 md:z-0
          md:block md:translate-x-0

          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="mb-5 flex justify-end md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-1">
          {pageLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                to={link.path}
                key={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive
                    ? 'flex gap-4 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'flex gap-4 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
