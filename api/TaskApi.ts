import api from './api';

export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.tasks;
};

// export const fetchTasks = async (limit: number = 10, offset: number = 0, sort: string = 'created_at', order: string = 'asc') => {
//   const response = await api.get('/tasks', {
//     params: { limit, offset, sort, order },
//   });
//   return response.data.tasks;
// };

// export const fetchTasks = async (limit: number = 10, offset: number = 0) => {
//   const response = await api.get('/tasks', {
//     params: { limit, offset },
//   });
//   return response.data;
// };

export const addTask = async (task: any) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const editTask = async (taskId: number, task: any) => {
  const response = await api.put(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
