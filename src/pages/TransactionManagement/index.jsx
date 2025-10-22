import { Card, Button, Row, Col } from 'antd';
import { 
  SearchOutlined, 
  UploadOutlined, 
  HistoryOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/shared/constants/routes';
import './index.css';

const TransactionManagement = () => {
  const navigate = useNavigate();

  const functions = [
    {
      key: 'detail',
      title: '取引明細照会',
      description: '取引の詳細情報を検索・照会します',
      icon: <SearchOutlined />,
      path: ROUTES.TRANSACTION_DETAIL,
    },
    {
      key: 'force-input',
      title: 'Rupps取引強制入力',
      description: 'CSVファイルをアップロードして取引を強制入力します',
      icon: <UploadOutlined />,
      path: ROUTES.TRANSACTION_FORCE_INPUT,
    },
    {
      key: 'history',
      title: 'Rupps取引強制入力履歴照会',
      description: '強制入力の履歴を確認します',
      icon: <HistoryOutlined />,
      path: ROUTES.TRANSACTION_FORCE_INPUT_HISTORY,
    },
  ];

  const handleNavigate = (path) => {
    // Open in new window for sub-pages
    window.open(`#${path}`, '_blank', 'width=1400,height=900');
  };

  return (
    <div className="transaction-management-page">
      <div className="page-header-section">
        <h1>取引管理</h1>
        <p>取引に関する各種機能を提供します</p>
      </div>

      <Row gutter={[24, 24]} className="functions-row">
        {functions.map((func) => (
          <Col xs={24} md={12} lg={8} key={func.key}>
            <Card className="function-card">
              <div className="function-icon">{func.icon}</div>
              <h3 className="function-title">{func.title}</h3>
              <p className="function-description">{func.description}</p>
              <Button 
                type="primary" 
                block
                onClick={() => handleNavigate(func.path)}
              >
                次へ
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TransactionManagement;
