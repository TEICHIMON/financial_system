import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // If the response has a code field, check it
    if (data.code !== undefined) {
      if (data.code === 200 || data.code === 0) {
        return data;
      } else {
        message.error(data.message || 'リクエストエラー');
        return Promise.reject(new Error(data.message || 'Error'));
      }
    }
    
    return data;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          message.error('認証エラー。再度ログインしてください。');
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('アクセス権限がありません');
          break;
        case 404:
          message.error('リソースが見つかりません');
          break;
        case 500:
          message.error('サーバーエラーが発生しました');
          break;
        default:
          message.error(data?.message || 'リクエストエラー');
      }
    } else if (error.request) {
      message.error('ネットワークエラー。接続を確認してください。');
    } else {
      message.error('リクエストの設定エラー');
    }
    
    return Promise.reject(error);
  }
);

export default request;
