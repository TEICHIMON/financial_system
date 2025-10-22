import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/store/slices/authSlice';
import { MENU_ITEMS } from '@/shared/constants/menu';
import ROUTES from '@/shared/constants/routes';
import './index.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'プロフィール',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '設定',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'ログアウト',
      onClick: handleLogout,
    },
  ];

  const menuItems = MENU_ITEMS.map((item) => ({
    key: item.key,
    icon: <item.icon />,
    label: item.label,
    onClick: () => navigate(item.path),
  }));

  // Get selected menu key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/transaction-management')) return 'transaction';
    if (path.startsWith('/balance-management')) return 'balance';
    if (path.startsWith('/market-value-management')) return 'market-value';
    if (path.startsWith('/approval-management')) return 'approval';
    return 'home';
  };

  return (
    <Layout className="main-layout">
      <Header className="header">
        <div className="header-left">
          <div className="logo">
            <TransactionOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span className="logo-text">金融取引管理</span>
          </div>
        </div>
        <div className="header-right">
          <Space size="large">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="user-info">
                <Avatar icon={<UserOutlined />} />
                <span className="user-name">{user?.name || 'ユーザー'}</span>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          className="sider"
          width={220}
        >
          <div className="collapse-trigger">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: '100%', height: '48px' }}
            />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>
        <Layout className="content-layout">
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
