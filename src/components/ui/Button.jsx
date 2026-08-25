function Button({ children, variant = 'primary', type = 'button', ...props }) {
  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary:
      'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800  text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost:
      'text-slate-500 dark:text-slate-300 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white',
  };

  return (
    <button
      type={type}
      className={` flex gap-2 items-center cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
