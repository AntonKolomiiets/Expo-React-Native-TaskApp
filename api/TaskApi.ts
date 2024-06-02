import api from './api';

export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.tasks;
};

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
