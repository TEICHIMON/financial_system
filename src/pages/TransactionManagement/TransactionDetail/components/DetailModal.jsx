import { Modal, Descriptions, Table, Tag, Spin } from 'antd';
import { formatCurrency, formatDateTime } from '@/shared/utils/format';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '../constants';

const DetailModal = ({ visible, data, loading, onClose }) => {
  if (!data && !loading) return null;

  const statusMap = {
    PENDING: { color: 'orange', text: TRANSACTION_STATUS.PENDING },
    APPROVED: { color: 'green', text: TRANSACTION_STATUS.APPROVED },
    REJECTED: { color: 'red', text: TRANSACTION_STATUS.REJECTED },
    CANCELLED: { color: 'default', text: TRANSACTION_STATUS.CANCELLED },
  };

  const statusConfig = statusMap[data?.status] || { color: 'default', text: data?.status };

  const securitiesColumns = [
    {
      title: '銘柄コード',
      dataIndex: 'securityCode',
      key: 'securityCode',
      width: 120,
    },
    {
      title: '銘柄名',
      dataIndex: 'securityName',
      key: 'securityName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (value) => value?.toLocaleString(),
    },
    {
      title: '単価',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <Modal
      title="取引詳細"
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
    >
      <Spin spinning={loading}>
        {data && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="取引番号" span={2}>
                {data.transactionNo}
              </Descriptions.Item>
              <Descriptions.Item label="取引日">
                {formatDateTime(data.date, 'YYYY年MM月DD日')}
              </Descriptions.Item>
              <Descriptions.Item label="取引種類">
                {TRANSACTION_TYPE[data.type] || data.type}
              </Descriptions.Item>
              <Descriptions.Item label="顧客コード">
                {data.customerCode}
              </Descriptions.Item>
              <Descriptions.Item label="顧客名">
                {data.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="ステータス">
                <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="金額">
                {formatCurrency(data.amount)}
              </Descriptions.Item>
              <Descriptions.Item label="説明" span={2}>
                {data.description || '-'}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <h4>銘柄明細</h4>
              <Table
                columns={securitiesColumns}
                dataSource={data.securities}
                rowKey="securityCode"
                pagination={false}
                size="small"
              />
            </div>

            <div style={{ marginTop: 24 }}>
              <h4>履歴情報</h4>
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="作成者">
                  {data.history?.createdBy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="作成日時">
                  {formatDateTime(data.history?.createdAt) || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="更新者">
                  {data.history?.updatedBy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="更新日時">
                  {formatDateTime(data.history?.updatedAt) || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="承認者">
                  {data.history?.approvedBy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="承認日時">
                  {formatDateTime(data.history?.approvedAt) || '-'}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {data.remarks && (
              <div style={{ marginTop: 24 }}>
                <h4>備考</h4>
                <p>{data.remarks}</p>
              </div>
            )}
          </>
        )}
      </Spin>
    </Modal>
  );
};

export default DetailModal;
