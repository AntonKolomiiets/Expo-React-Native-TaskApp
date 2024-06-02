import api from './api';

export const signup = async (username: string, password: string) => {
  const response = await api.post('/signup', { user_name: username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { user_name: username, password });
  return response.data;
};
