import { Card, Row, Col, Statistic } from 'antd';
import { 
  TransactionOutlined, 
  DollarOutlined, 
  RiseOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.css';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  const statsData = [
    {
      title: '今日の取引件数',
      value: 128,
      icon: <TransactionOutlined />,
      color: '#1890ff',
    },
    {
      title: '総残高',
      value: 15800000,
      prefix: '¥',
      icon: <DollarOutlined />,
      color: '#52c41a',
    },
    {
      title: '本日の変動率',
      value: 2.5,
      suffix: '%',
      icon: <RiseOutlined />,
      color: '#faad14',
    },
    {
      title: '承認待ち',
      value: 5,
      icon: <CheckCircleOutlined />,
      color: '#f5222d',
    },
  ];

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h1>ようこそ、{user?.name}さん</h1>
        <p>金融取引管理システムへようこそ。本日の概要をご確認ください。</p>
      </div>

      <Row gutter={[16, 16]} className="stats-row">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="content-row">
        <Col xs={24} lg={16}>
          <Card title="システム概要" className="info-card">
            <div className="info-section">
              <h3>主な機能</h3>
              <ul>
                <li>
                  <strong>取引管理:</strong> 取引明細の照会、強制入力、履歴管理
                </li>
                <li>
                  <strong>残高損益管理:</strong> 口座残高と損益の追跡と分析
                </li>
                <li>
                  <strong>時価管理:</strong> リアルタイムの市場価格管理
                </li>
                <li>
                  <strong>承認管理:</strong> ワークフローの承認プロセス
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h3>お知らせ</h3>
              <ul>
                <li>システムメンテナンス予定: 2025年11月1日 02:00-04:00</li>
                <li>新機能追加: バッチ処理の最適化が完了しました</li>
                <li>定期レポート: 月次レポートが利用可能です</li>
              </ul>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="クイックアクセス" className="quick-access-card">
            <div className="quick-links">
              <a href="#/transaction-management" className="quick-link">
                <TransactionOutlined />
                <span>取引管理</span>
              </a>
              <a href="#/balance-management" className="quick-link">
                <DollarOutlined />
                <span>残高損益管理</span>
              </a>
              <a href="#/market-value-management" className="quick-link">
                <RiseOutlined />
                <span>時価管理</span>
              </a>
              <a href="#/approval-management" className="quick-link">
                <CheckCircleOutlined />
                <span>承認管理</span>
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
