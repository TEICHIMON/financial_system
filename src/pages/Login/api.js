import request from '@/app/api/request';

export const login = (data) => {
  return request.post('/auth/login', data);
};

export const logout = () => {
  return request.post('/auth/logout');
};

export const getUserInfo = () => {
  return request.get('/auth/user');
};
