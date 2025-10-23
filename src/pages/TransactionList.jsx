import React, { useState, useEffect } from 'react';
import { getTransactionList, exportTransactionCSV } from '../api/transaction';
import { Button, Input, Select, DatePicker, Table, Pagination, Card, Loading } from '../components/common';
import { formatDate, downloadFile } from '../utils/helpers';

const TransactionList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    ruppsTransactionId: '',
    sourceSystem: '',
    tradeType: '',
    seller: '',
    debitCredit: '',
    settlementCode: '',
    status: '',
  });
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.pageSize]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...filters,
      };
      
      const response = await getTransactionList(params);
      
      if (response.success) {
        setData(response.data.list);
        setPagination({
          ...pagination,
          total: response.data.total,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchData();
  };
  
  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      ruppsTransactionId: '',
      sourceSystem: '',
      tradeType: '',
      seller: '',
      debitCredit: '',
      settlementCode: '',
      status: '',
    });
    setPagination({ ...pagination, page: 1 });
  };
  
  const handleExport = async () => {
    try {
      const response = await exportTransactionCSV(filters);
      downloadFile(response, `transactions_${Date.now()}.csv`);
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };
  
  const columns = [
    {
      title: 'RuPPs取引連番',
      dataIndex: 'ruppsTransactionId',
      key: 'ruppsTransactionId',
    },
    {
      title: 'ソースシステム',
      dataIndex: 'sourceSystem',
      key: 'sourceSystem',
    },
    {
      title: 'RuPPs取引連番',
      dataIndex: 'ruppsTradeId',
      key: 'ruppsTradeId',
    },
    {
      title: '取引相手',
      dataIndex: 'tradeType',
      key: 'tradeType',
    },
    {
      title: '売買',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: '貸借',
      dataIndex: 'debitCredit',
      key: 'debitCredit',
    },
    {
      title: '決済',
      dataIndex: 'settlement',
      key: 'settlement',
    },
    {
      title: '銘柄コード',
      dataIndex: 'settlementCode',
      key: 'settlementCode',
    },
    {
      title: '申請者',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: '約定年月日',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
      render: (date) => formatDate(date),
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          '申請中': 'bg-yellow-100 text-yellow-800',
          '承認済': 'bg-green-100 text-green-800',
          '却下': 'bg-red-100 text-red-800',
          '取消': 'bg-gray-100 text-gray-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
          </span>
        );
      },
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">取引明細照会画面</h1>
        </div>
        <Button
          variant="ghost"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? '閉じる' : '開く'}
        </Button>
      </div>
      
      {/* Search Filters */}
      {showSearch && (
        <Card title="検索条件">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DatePicker
              label="約定年月日"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <DatePicker
              label="～"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
            <Input
              label="RuPPs取引連番"
              value={filters.ruppsTransactionId}
              onChange={(e) => setFilters({ ...filters, ruppsTransactionId: e.target.value })}
            />
            
            <Select
              label="ソースシステム"
              value={filters.sourceSystem}
              onChange={(e) => setFilters({ ...filters, sourceSystem: e.target.value })}
              options={[
                { label: 'NORMAL', value: 'NORMAL' },
                { label: 'CANCEL', value: 'CANCEL' },
                { label: 'TEST', value: 'TEST' },
              ]}
            />
            
            <Select
              label="取引相手"
              value={filters.tradeType}
              onChange={(e) => setFilters({ ...filters, tradeType: e.target.value })}
              options={[
                { label: '取引開始', value: '取引開始' },
                { label: '新規', value: '新規' },
                { label: '修正', value: '修正' },
              ]}
            />
            
            <Select
              label="売買"
              value={filters.seller}
              onChange={(e) => setFilters({ ...filters, seller: e.target.value })}
              options={[
                { label: '売買', value: '売買' },
                { label: '売却', value: '売却' },
                { label: '購入', value: '購入' },
              ]}
            />
            
            <Select
              label="貸借"
              value={filters.debitCredit}
              onChange={(e) => setFilters({ ...filters, debitCredit: e.target.value })}
              options={[
                { label: '借方', value: '借方' },
                { label: '貸方', value: '貸方' },
              ]}
            />
            
            <Input
              label="銘柄コード"
              value={filters.settlementCode}
              onChange={(e) => setFilters({ ...filters, settlementCode: e.target.value })}
            />
            
            <Select
              label="ステータス"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { label: '申請中', value: '申請中' },
                { label: '承認済', value: '承認済' },
                { label: '却下', value: '却下' },
                { label: '取消', value: '取消' },
              ]}
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSearch}>
              🔍 検索
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              リセット
            </Button>
          </div>
        </Card>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => fetchData()}>
          取引強制照会
        </Button>
        <Button variant="success" onClick={handleExport}>
          📥 CSV出力
        </Button>
      </div>
      
      {/* Data Table */}
      <Card>
        <Table
          columns={columns}
          data={data}
          loading={loading}
          selectable={true}
          selectedRows={selectedRows}
          onSelectRow={setSelectedRows}
        />
        
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          pageSize={pagination.pageSize}
          onPageChange={(page) => setPagination({ ...pagination, page })}
        />
      </Card>
    </div>
  );
};

export default TransactionList;
