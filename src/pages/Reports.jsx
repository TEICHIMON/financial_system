import React, { useState } from 'react';
import { Button, Card, Select, DatePicker, Table } from '../components/common';
import { formatDate, formatCurrency } from '../utils/helpers';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  
  const reportTypes = [
    { label: '取引集計レポート', value: 'transaction_summary' },
    { label: '承認状況レポート', value: 'approval_status' },
    { label: '部門別取引レポート', value: 'department_transaction' },
    { label: '月次レポート', value: 'monthly_report' },
    { label: '年次レポート', value: 'yearly_report' },
  ];
  
  const generateReport = () => {
    // Simulate report generation
    const mockData = [
      {
        id: 1,
        department: '営業部',
        totalTransactions: 150,
        approvedCount: 120,
        pendingCount: 25,
        rejectedCount: 5,
        totalAmount: 15000000,
      },
      {
        id: 2,
        department: '経理部',
        totalTransactions: 200,
        approvedCount: 180,
        pendingCount: 15,
        rejectedCount: 5,
        totalAmount: 25000000,
      },
      {
        id: 3,
        department: '管理部',
        totalTransactions: 80,
        approvedCount: 70,
        pendingCount: 8,
        rejectedCount: 2,
        totalAmount: 8000000,
      },
    ];
    
    setReportData(mockData);
  };
  
  const columns = [
    {
      title: '部門',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '取引総数',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
    },
    {
      title: '承認済',
      dataIndex: 'approvedCount',
      key: 'approvedCount',
      render: (count) => (
        <span className="text-green-600 font-semibold">{count}</span>
      ),
    },
    {
      title: '申請中',
      dataIndex: 'pendingCount',
      key: 'pendingCount',
      render: (count) => (
        <span className="text-yellow-600 font-semibold">{count}</span>
      ),
    },
    {
      title: '却下',
      dataIndex: 'rejectedCount',
      key: 'rejectedCount',
      render: (count) => (
        <span className="text-red-600 font-semibold">{count}</span>
      ),
    },
    {
      title: '取引金額合計',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => formatCurrency(amount),
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">レポート</h1>
        <p className="text-gray-600 mt-1">各種レポートを生成・閲覧できます</p>
      </div>
      
      {/* Report Selection */}
      <Card title="レポート設定">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="レポート種類"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            options={reportTypes}
            required
          />
          
          <DatePicker
            label="開始日"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          
          <DatePicker
            label="終了日"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button onClick={generateReport} disabled={!reportType}>
            📊 レポート生成
          </Button>
          <Button variant="success">
            📥 Excel出力
          </Button>
          <Button variant="secondary">
            🖨️ 印刷
          </Button>
        </div>
      </Card>
      
      {/* Report Results */}
      {reportData.length > 0 && (
        <Card title="レポート結果">
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">取引総数</p>
                <p className="text-2xl font-bold text-blue-900">430</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-1">承認済</p>
                <p className="text-2xl font-bold text-green-900">370</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-600 mb-1">申請中</p>
                <p className="text-2xl font-bold text-yellow-900">48</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-600 mb-1">却下</p>
                <p className="text-2xl font-bold text-red-900">12</p>
              </div>
            </div>
          </div>
          
          <Table
            columns={columns}
            data={reportData}
          />
        </Card>
      )}
      
      {/* Quick Reports */}
      <Card title="クイックレポート">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all text-left">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              今月の取引サマリー
            </h3>
            <p className="text-sm text-gray-600">
              当月の取引状況を確認
            </p>
          </button>
          
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all text-left">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              承認処理状況
            </h3>
            <p className="text-sm text-gray-600">
              承認待ちの案件を確認
            </p>
          </button>
          
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all text-left">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              金額集計レポート
            </h3>
            <p className="text-sm text-gray-600">
              取引金額の集計を確認
            </p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
