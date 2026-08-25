import { Menu, Moon, Plus, Sun } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-6 ">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
          Smart Tasks
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Button onClick={() => navigate('tasks/new')}>
          <Plus size={18} />
          <span className="hidden sm:inline">Create Task</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
