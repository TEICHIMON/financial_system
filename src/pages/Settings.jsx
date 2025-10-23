import React, { useState } from 'react';
import { Button, Card, Input, Select, Modal } from '../components/common';

const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [userSettings, setUserSettings] = useState({
    email: 'admin@rupps.com',
    language: 'ja',
    timezone: 'Asia/Tokyo',
    pageSize: '10',
    theme: 'light',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotification: true,
    approvalNotification: true,
    transactionNotification: false,
    reportNotification: true,
  });
  
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新しいパスワードが一致しません');
      return;
    }
    
    // Call API to change password
    alert('パスワードを変更しました');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleSaveSettings = () => {
    // Call API to save settings
    alert('設定を保存しました');
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">設定</h1>
        <p className="text-gray-600 mt-1">システムの各種設定を管理できます</p>
      </div>
      
      {/* User Profile */}
      <Card title="ユーザー情報">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">ユーザーID</p>
              <p className="text-base font-semibold text-gray-900">B1125825</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ユーザー名</p>
              <p className="text-base font-semibold text-gray-900">Administrator</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">部門</p>
              <p className="text-base font-semibold text-gray-900">管理部</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">役割</p>
              <p className="text-base font-semibold text-gray-900">管理者</p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button onClick={() => setShowPasswordModal(true)}>
              🔒 パスワード変更
            </Button>
          </div>
        </div>
      </Card>
      
      {/* System Settings */}
      <Card title="システム設定">
        <div className="space-y-4">
          <Input
            label="メールアドレス"
            type="email"
            value={userSettings.email}
            onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
          />
          
          <Select
            label="言語"
            value={userSettings.language}
            onChange={(e) => setUserSettings({ ...userSettings, language: e.target.value })}
            options={[
              { label: '日本語', value: 'ja' },
              { label: 'English', value: 'en' },
              { label: '中文', value: 'zh' },
            ]}
          />
          
          <Select
            label="タイムゾーン"
            value={userSettings.timezone}
            onChange={(e) => setUserSettings({ ...userSettings, timezone: e.target.value })}
            options={[
              { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
              { label: 'America/New_York', value: 'America/New_York' },
              { label: 'Europe/London', value: 'Europe/London' },
            ]}
          />
          
          <Select
            label="1ページあたりの表示件数"
            value={userSettings.pageSize}
            onChange={(e) => setUserSettings({ ...userSettings, pageSize: e.target.value })}
            options={[
              { label: '10件', value: '10' },
              { label: '20件', value: '20' },
              { label: '50件', value: '50' },
              { label: '100件', value: '100' },
            ]}
          />
          
          <Select
            label="テーマ"
            value={userSettings.theme}
            onChange={(e) => setUserSettings({ ...userSettings, theme: e.target.value })}
            options={[
              { label: 'ライト', value: 'light' },
              { label: 'ダーク', value: 'dark' },
              { label: 'システム設定に従う', value: 'system' },
            ]}
          />
          
          <div className="pt-4">
            <Button onClick={handleSaveSettings}>
              💾 設定を保存
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Notification Settings */}
      <Card title="通知設定">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notificationSettings.emailNotification}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                emailNotification: e.target.checked
              })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">メール通知</p>
              <p className="text-sm text-gray-600">重要な更新をメールで受け取る</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notificationSettings.approvalNotification}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                approvalNotification: e.target.checked
              })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">承認通知</p>
              <p className="text-sm text-gray-600">承認リクエストの通知を受け取る</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notificationSettings.transactionNotification}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                transactionNotification: e.target.checked
              })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">取引通知</p>
              <p className="text-sm text-gray-600">新しい取引の通知を受け取る</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notificationSettings.reportNotification}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                reportNotification: e.target.checked
              })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">レポート通知</p>
              <p className="text-sm text-gray-600">レポート生成完了の通知を受け取る</p>
            </div>
          </label>
          
          <div className="pt-4">
            <Button onClick={handleSaveSettings}>
              💾 設定を保存
            </Button>
          </div>
        </div>
      </Card>
      
      {/* System Information */}
      <Card title="システム情報">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">バージョン</p>
            <p className="text-base font-semibold text-gray-900">v1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">最終更新日</p>
            <p className="text-base font-semibold text-gray-900">2025/10/23</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">サーバー状態</p>
            <p className="text-base font-semibold text-green-600">正常</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">データベース接続</p>
            <p className="text-base font-semibold text-green-600">接続中</p>
          </div>
        </div>
      </Card>
      
      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="パスワード変更"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
              キャンセル
            </Button>
            <Button onClick={handlePasswordChange}>
              変更
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="現在のパスワード"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          
          <Input
            label="新しいパスワード"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          
          <Input
            label="新しいパスワード（確認）"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
          />
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ⓘ パスワードは8文字以上で、大文字、小文字、数字を含める必要があります。
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
