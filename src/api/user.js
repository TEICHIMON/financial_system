import api from './request';

// 用户登录
export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

// 用户登出
export const logout = () => {
  return api.post('/auth/logout');
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return api.get('/auth/user');
};

// 修改密码
export const changePassword = (oldPassword, newPassword) => {
  return api.post('/auth/change-password', { oldPassword, newPassword });
};

// 获取用户列表
export const getUserList = (params) => {
  return api.get('/users', { params });
};

// 更新用户信息
export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data);
};
