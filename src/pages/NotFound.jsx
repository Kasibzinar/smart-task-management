function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-indigo-600">404</p>

      <h1 className="mt-2 text-3xl font-semibold text-slate-800 dark:text-slate-100">
        Page not found
      </h1>

      <p className="mt-2 text-slate-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
