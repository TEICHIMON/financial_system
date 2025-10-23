import React, { useState, useEffect } from 'react';
import { getApprovalList, approveRequest, rejectRequest } from '../api/approval';
import { Button, Table, Pagination, Card, Modal, Input, Select } from '../components/common';
import { formatDate } from '../utils/helpers';

const ApprovalList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState('');
  const [comment, setComment] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);
  
  const [filters, setFilters] = useState({
    applicant: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  
  useEffect(() => {
    fetchData();
  }, [pagination.page]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...filters,
      };
      
      const response = await getApprovalList(params);
      
      if (response.success) {
        setData(response.data.list);
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {
      console.error('Failed to fetch approvals:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = (record) => {
    setCurrentRecord(record);
    setApprovalAction('approve');
    setShowApprovalModal(true);
  };
  
  const handleReject = (record) => {
    setCurrentRecord(record);
    setApprovalAction('reject');
    setShowApprovalModal(true);
  };
  
  const handleSubmitApproval = async () => {
    try {
      if (approvalAction === 'approve') {
        await approveRequest(currentRecord.id, comment);
      } else {
        await rejectRequest(currentRecord.id, comment);
      }
      
      setShowApprovalModal(false);
      setComment('');
      setCurrentRecord(null);
      fetchData();
    } catch (error) {
      console.error('Failed to submit approval:', error);
    }
  };
  
  const handleSelectAll = () => {
    const allIds = data.filter(item => item.status === '申請中').map(item => item.id);
    setSelectedRows(allIds);
  };
  
  const columns = [
    {
      title: '選択',
      dataIndex: 'id',
      key: 'select',
      render: (id, record) => (
        record.status === '申請中' && (
          <input
            type="checkbox"
            checked={selectedRows.includes(id)}
            onChange={() => {
              if (selectedRows.includes(id)) {
                setSelectedRows(selectedRows.filter(rowId => rowId !== id));
              } else {
                setSelectedRows([...selectedRows, id]);
              }
            }}
            className="rounded border-gray-300"
          />
        )
      ),
    },
    {
      title: '進捗状況',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          '申請中': 'bg-yellow-100 text-yellow-800',
          '承認済': 'bg-green-100 text-green-800',
          '却下': 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: '申請日',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
      render: (date) => formatDate(date),
    },
    {
      title: '時間',
      dataIndex: 'applicationTime',
      key: 'applicationTime',
    },
    {
      title: '承認分類',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '更新分類',
      dataIndex: 'type',
      key: 'updateType',
    },
    {
      title: '申請者',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: '申請理由',
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => (
        <div className="max-w-xs truncate" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        record.status === '申請中' && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => handleApprove(record)}
            >
              承認
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleReject(record)}
            >
              否認
            </Button>
          </div>
        )
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">承認照会画面</h1>
      </div>
      
      {/* Search Filters */}
      <Card title="検索条件">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="申請者選択"
            value={filters.applicant}
            onChange={(e) => setFilters({ ...filters, applicant: e.target.value })}
          />
          <Input
            label="承認者選択"
            value={filters.approver}
            onChange={(e) => setFilters({ ...filters, approver: e.target.value })}
          />
          <Input
            label="申請年月日"
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <Input
            label="～"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button onClick={fetchData}>
            🔍 検索
          </Button>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSelectAll}>
          全選択
        </Button>
        <Button variant="secondary" onClick={() => setSelectedRows([])}>
          全選択解除
        </Button>
        <Button variant="success" disabled={selectedRows.length === 0}>
          承認
        </Button>
        <Button variant="danger" disabled={selectedRows.length === 0}>
          否認
        </Button>
      </div>
      
      {/* Data Table */}
      <Card>
        <Table
          columns={columns}
          data={data}
          loading={loading}
        />
        
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          pageSize={pagination.pageSize}
          onPageChange={(page) => setPagination({ ...pagination, page })}
        />
      </Card>
      
      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title={approvalAction === 'approve' ? '承認確認' : '否認確認'}
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
              キャンセル
            </Button>
            <Button
              variant={approvalAction === 'approve' ? 'success' : 'danger'}
              onClick={handleSubmitApproval}
            >
              {approvalAction === 'approve' ? '承認' : '否認'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            この申請を{approvalAction === 'approve' ? '承認' : '否認'}してもよろしいですか？
          </p>
          
          <Input
            label="コメント"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力してください（任意）"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ApprovalList;
