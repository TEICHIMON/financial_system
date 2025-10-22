import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { setCredentials } from '@/app/store/slices/authSlice';
import { login as loginAPI } from '../api';
import ROUTES from '@/shared/constants/routes';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await loginAPI(values);
      
      if (response.code === 200) {
        const { token, user } = response.data;
        dispatch(setCredentials({ user, token }));
        message.success('ログイン成功');
        navigate(ROUTES.HOME);
      } else {
        message.error(response.message || 'ログインに失敗しました');
      }
    } catch (error) {
      message.error('ログインに失敗しました。もう一度お試しください。');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
};
