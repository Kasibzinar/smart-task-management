import useTheme from '../hooks/useTheme';

function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your application settings.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose how Smart Tasks looks.
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Light
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            About
          </h2>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Application
              </p>

              <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                Smart Task Management System
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Description
              </p>

              <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                A simple frontend task management application built with React.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Version:
              </p>

              <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                first
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
