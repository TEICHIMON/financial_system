import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userProfile = 'B1125825'; // 从 localStorage 或 context 获取
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b-4 border-primary-600 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 text-white px-3 py-1 rounded font-bold text-lg">
                RuPPs
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Ruito Position Profit and Loss
              </h1>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">User Profile:</span>
              <span className="font-semibold text-gray-900">{userProfile}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
