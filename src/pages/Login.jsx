import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import { Button, Input } from '../components/common';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login(formData.username, formData.password);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userProfile', response.data.user.id);
        navigate('/');
      }
    } catch (err) {
      setError('ユーザー名またはパスワードが正しくありません');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-2xl">
              RuPPs
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Ruito Position Profit and Loss
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            システムにログインしてください
          </p>
        </div>
        
        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            
            <Input
              label="ユーザー名"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="ユーザー名を入力"
              required
            />
            
            <Input
              label="パスワード"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="パスワードを入力"
              required
            />
            
            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              ログイン
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">
                デモアカウント
              </p>
              <p className="text-xs text-blue-700">
                ユーザー名: <span className="font-mono font-semibold">admin</span>
              </p>
              <p className="text-xs text-blue-700">
                パスワード: <span className="font-mono font-semibold">admin</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 RuPPs System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
