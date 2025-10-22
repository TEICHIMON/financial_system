import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ExportButton = ({ data, selectedRows }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Simulate CSV export
      const exportData = selectedRows?.length > 0 ? selectedRows : data;
      
      if (!exportData || exportData.length === 0) {
        message.warning('エクスポートするデータがありません');
        return;
      }

      // Create CSV content
      const headers = ['取引番号', '取引日', '顧客コード', '顧客名', '取引種類', '金額', 'ステータス'];
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => [
          row.transactionNo,
          row.date,
          row.customerCode,
          row.customerName,
          row.type,
          row.amount,
          row.status,
        ].join(',')),
      ].join('\n');

      // Create and download file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success('エクスポートが完了しました');
    } catch (error) {
      message.error('エクスポートに失敗しました');
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="default"
      icon={<DownloadOutlined />}
      onClick={handleExport}
      loading={loading}
    >
      CSV出力
    </Button>
  );
};

export default ExportButton;
