import { Card, Empty } from 'antd';
import PageHeader from '@/shared/components/Layout/PageHeader';

const ForceInputHistory = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <PageHeader 
        title="Rupps取引強制入力履歴照会画面"
        onClose={() => window.close()}
      />
      <div style={{ padding: '0 24px 24px' }}>
        <Card>
          <Empty description="この機能は実装中です" />
        </Card>
      </div>
    </div>
  );
};

export default ForceInputHistory;
