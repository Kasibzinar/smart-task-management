import z from 'zod';

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required.')
    .min(3, 'Task title must be at least 3 characters.'),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 3 characters.'),

  priority: z.string().min(1, 'Please select a priority'),

  category: z.string().min(1, 'Please select a category'),

  dueDate: z
    .string()
    .min(1, 'Due date is required.')
    .refine(
      (date) => date >= new Date().toISOString().split('T')[0],
      'Due date connot be in the past.',
    ),
});

export default taskSchema;
