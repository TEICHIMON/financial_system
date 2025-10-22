import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './index.css';

const PageHeader = ({ title, onClose, extra }) => {
  return (
    <div className="page-header">
      <div className="page-header-left">
        <h2 className="page-title">{title}</h2>
      </div>
      <div className="page-header-right">
        {extra}
        {onClose && (
          <Button 
            type="default" 
            icon={<CloseOutlined />}
            onClick={onClose}
          >
            閉じる
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
