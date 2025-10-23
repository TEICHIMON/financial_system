import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { 
      title: '申請中', 
      value: 15, 
      color: 'bg-yellow-500',
      icon: '⏳',
      onClick: () => navigate('/transactions?status=申請中')
    },
    { 
      title: '承認済', 
      value: 42, 
      color: 'bg-green-500',
      icon: '✓',
      onClick: () => navigate('/transactions?status=承認済')
    },
    { 
      title: '却下', 
      value: 3, 
      color: 'bg-red-500',
      icon: '✗',
      onClick: () => navigate('/transactions?status=却下')
    },
    { 
      title: '取引総数', 
      value: 60, 
      color: 'bg-blue-500',
      icon: '📊',
      onClick: () => navigate('/transactions')
    },
  ];
  
  const quickActions = [
    {
      title: '取引明細照会',
      description: '取引の詳細を確認できます',
      icon: '📋',
      onClick: () => navigate('/transactions'),
      color: 'bg-primary-600'
    },
    {
      title: '承認照会',
      description: '承認待ちの申請を確認できます',
      icon: '✓',
      onClick: () => navigate('/approvals'),
      color: 'bg-green-600'
    },
    {
      title: '取引強制入力',
      description: '新しい取引を登録できます',
      icon: '➕',
      onClick: () => navigate('/force-input'),
      color: 'bg-blue-600'
    },
    {
      title: 'レポート',
      description: '各種レポートを確認できます',
      icon: '📈',
      onClick: () => navigate('/reports'),
      color: 'bg-purple-600'
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600 mt-1">システムの概要を確認できます</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <Card title="クイックアクション">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all text-left"
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white mb-4`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </Card>
      
      {/* Recent Activities */}
      <Card title="最近のアクティビティ">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-500 w-2 h-2 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">取引 #1039342 が承認されました</p>
              <p className="text-xs text-gray-600 mt-1">2025/05/07 14:30</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-yellow-500 w-2 h-2 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">新しい承認リクエストが届きました</p>
              <p className="text-xs text-gray-600 mt-1">2025/05/07 12:15</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-500 w-2 h-2 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">CSVファイルがアップロードされました</p>
              <p className="text-xs text-gray-600 mt-1">2025/03/05 10:00</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
