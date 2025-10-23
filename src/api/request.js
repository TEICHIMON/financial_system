import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加用户信息
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      config.headers['X-User-Profile'] = userProfile;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 假设后端返回格式为 { code, data, message }
    if (data.code === 200 || data.success) {
      return data;
    }
    
    // 处理业务错误
    console.error('Business error:', data.message);
    return Promise.reject(new Error(data.message || 'Unknown error'));
  },
  (error) => {
    // 处理 HTTP 错误
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          localStorage.removeItem('token');
          localStorage.removeItem('userProfile');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('HTTP error:', status);
      }
      
      return Promise.reject(error.response.data || error.response);
    }
    
    if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject(new Error('Network error'));
    }
    
    console.error('Request setup error:', error.message);
    return Promise.reject(error);
  }
);

export default api;
