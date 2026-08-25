import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import useTasks from '../hooks/useTasks';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  const { tasks } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const days = generateDays();
  const selectedTasks = getTasksForSelectedDate();

  function getDaysInMonth() {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
  }

  function getFirstDayOfMonth() {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
  }

  function generateDays() {
    const days = [];

    const firstDay = getFirstDayOfMonth();

    const daysInMonth = getDaysInMonth();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      );

      days.push({ day: i, date });
    }

    return days;
  }

  function getMonthName() {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  function isToday(item) {
    if (!item) return false;

    const today = new Date();

    return (
      item.date.getDate() === today.getDate() &&
      item.date.getMonth() === today.getMonth() &&
      item.date.getFullYear() === today.getFullYear()
    );
  }

  function handleDateClick(item) {
    if (!item) return;

    setSelectedDate(item.date);
  }

  function getTasksForSelectedDate() {
    if (!selectedDate) return [];

    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);

      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="secondary" onClick={goToPreviousMonth}>
            <ChevronLeft size={18} />
            Previous
          </Button>

          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {getMonthName()}
          </h1>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={goToToday}>
              Today
            </Button>

            <Button variant="secondary" onClick={goToNextMonth}>
              Next
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 sm:gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(item)}
              className={`
              flex aspect-square cursor-pointer items-center justify-center
              rounded-lg border text-sm
              ${
                !item
                  ? 'border-transparent'
                  : isToday(item)
                    ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              }
            `}
            >
              {item?.day}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Selected Tasks
        </h2>

        {!selectedDate && (
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Select a date to view tasks.
          </p>
        )}

        {selectedDate && selectedTasks.length === 0 && (
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            No tasks for this day
          </p>
        )}

        <div className="mt-4 space-y-3">
          {selectedTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 className="font-medium text-slate-800 dark:text-slate-100">
                {task.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {task.description}
              </p>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Status: {task.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
