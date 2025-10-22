import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined, TransactionOutlined } from '@ant-design/icons';
import { useLogin } from './hooks/useLogin';
import './index.css';

const Login = () => {
  const { loading, handleLogin } = useLogin();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Card className="login-card">
          <div className="login-header">
            <TransactionOutlined className="login-icon" />
            <h1 className="login-title">金融取引管理システム</h1>
            <p className="login-subtitle">Financial Trading Management System</p>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'ユーザー名を入力してください' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="ユーザー名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'パスワードを入力してください' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="パスワード"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>ログイン状態を保持</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                ログイン
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <p className="demo-hint">
              デモ用: ユーザー名は任意、パスワードは <strong>123456</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
