import { Table, Tag, Card } from 'antd';
import { formatCurrency, formatDate } from '@/shared/utils/format';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '../constants';

const ResultTable = ({ data, loading, pagination, onPageChange, onRowClick }) => {
  const columns = [
    {
      title: '取引番号',
      dataIndex: 'transactionNo',
      key: 'transactionNo',
      width: 180,
      fixed: 'left',
      render: (text) => (
        <a onClick={(e) => e.stopPropagation()}>{text}</a>
      ),
    },
    {
      title: '取引日',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => formatDate(date, 'YYYY-MM-DD'),
    },
    {
      title: '顧客コード',
      dataIndex: 'customerCode',
      key: 'customerCode',
      width: 120,
    },
    {
      title: '顧客名',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
    },
    {
      title: '取引種類',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => TRANSACTION_TYPE[type] || type,
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      align: 'right',
      render: (amount) => formatCurrency(amount),
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusMap = {
          PENDING: { color: 'orange', text: TRANSACTION_STATUS.PENDING },
          APPROVED: { color: 'green', text: TRANSACTION_STATUS.APPROVED },
          REJECTED: { color: 'red', text: TRANSACTION_STATUS.REJECTED },
          CANCELLED: { color: 'default', text: TRANSACTION_STATUS.CANCELLED },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '承認者',
      dataIndex: 'approver',
      key: 'approver',
      width: 120,
    },
    {
      title: '更新日時',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date) => formatDate(date, 'YYYY-MM-DD HH:mm'),
    },
  ];

  return (
    <Card className="result-table section-card">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `全 ${total} 件`,
          onChange: onPageChange,
        }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
          style: { cursor: 'pointer' },
        })}
      />
    </Card>
  );
};

export default ResultTable;
