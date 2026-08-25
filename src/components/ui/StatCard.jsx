import Card from './Card';

function StatCard({ title, value }) {
  return (
    <Card>
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-800 dark:text-slate-100">
        {value}
      </p>
    </Card>
  );
}

export default StatCard;
