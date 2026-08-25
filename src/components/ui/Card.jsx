function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-5 dark:bg-slate-900 dark:border-slate-800 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
