import React, { useState } from 'react';
import { uploadTransactionCSV, forceInputTransaction } from '../api/transaction';
import { Button, Input, Select, DatePicker, FileUpload, Card, Table, Pagination, Modal } from '../components/common';

const ForceInput = () => {
  const [uploadMode, setUploadMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  
  const [formData, setFormData] = useState({
    sourceSystem: '',
    settlementCode: '',
    selfAccount: '',
    tradeType: '',
    seller: '',
    debitCredit: '',
    contractDate: '',
    receiptDate: '',
    department: '',
    openingNumber: '',
    investmentType: '',
  });
  
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('ファイルを選択してください');
      return;
    }
    
    try {
      const response = await uploadTransactionCSV(selectedFile);
      
      if (response.success) {
        setUploadResult(response.data);
        setShowResultModal(true);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('アップロードに失敗しました');
    }
  };
  
  const handleManualInput = async () => {
    try {
      const response = await forceInputTransaction(formData);
      
      if (response.success) {
        alert('取引を登録しました');
        // Reset form
        setFormData({
          sourceSystem: '',
          settlementCode: '',
          selfAccount: '',
          tradeType: '',
          seller: '',
          debitCredit: '',
          contractDate: '',
          receiptDate: '',
          department: '',
          openingNumber: '',
          investmentType: '',
        });
      }
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('登録に失敗しました');
    }
  };
  
  const columns = [
    { title: '登録状況', dataIndex: 'status', key: 'status' },
    { title: '行番号', dataIndex: 'rowNumber', key: 'rowNumber' },
    { title: 'ソースシステム', dataIndex: 'sourceSystem', key: 'sourceSystem' },
    { title: '銘柄コード', dataIndex: 'settlementCode', key: 'settlementCode' },
    { title: '自己勘定番号', dataIndex: 'selfAccount', key: 'selfAccount' },
    { title: '取引相手', dataIndex: 'tradeType', key: 'tradeType' },
    { title: '売買', dataIndex: 'seller', key: 'seller' },
    { title: '貸借', dataIndex: 'debitCredit', key: 'debitCredit' },
    { title: '約定年月日', dataIndex: 'contractDate', key: 'contractDate' },
    { title: '受渡年月日', dataIndex: 'receiptDate', key: 'receiptDate' },
    { title: '部店', dataIndex: 'department', key: 'department' },
    { title: '開示番号', dataIndex: 'openingNumber', key: 'openingNumber' },
    { title: '投資区分', dataIndex: 'investmentType', key: 'investmentType' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RuPPs取引強制入力画面</h1>
      </div>
      
      {/* Upload or Manual Input Toggle */}
      <Card>
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={uploadMode}
              onChange={(e) => setUploadMode(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">会計仕訳</span>
          </label>
        </div>
        
        {uploadMode ? (
          /* CSV Upload Mode */
          <div className="space-y-4">
            <FileUpload
              label="アップロードファイル(CSV)"
              accept=".csv"
              onFileSelect={setSelectedFile}
              buttonText="参照"
            />
            
            <div className="flex gap-3">
              <Button onClick={handleFileUpload} disabled={!selectedFile}>
                📤 登録
              </Button>
              <Input
                placeholder="承認者選択"
                className="flex-1 max-w-md"
              />
            </div>
          </div>
        ) : (
          /* Manual Input Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="ソースシステム"
                value={formData.sourceSystem}
                onChange={(e) => setFormData({ ...formData, sourceSystem: e.target.value })}
                options={[
                  { label: 'NORMAL', value: 'NORMAL' },
                  { label: 'CANCEL', value: 'CANCEL' },
                  { label: 'TEST', value: 'TEST' },
                ]}
                required
              />
              
              <Input
                label="銘柄コード"
                value={formData.settlementCode}
                onChange={(e) => setFormData({ ...formData, settlementCode: e.target.value })}
                required
              />
              
              <Input
                label="自己勘定番号"
                value={formData.selfAccount}
                onChange={(e) => setFormData({ ...formData, selfAccount: e.target.value })}
              />
              
              <Select
                label="取引相手"
                value={formData.tradeType}
                onChange={(e) => setFormData({ ...formData, tradeType: e.target.value })}
                options={[
                  { label: '取引開始', value: '取引開始' },
                  { label: '新規', value: '新規' },
                  { label: '修正', value: '修正' },
                ]}
                required
              />
              
              <Select
                label="売買"
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                options={[
                  { label: '売買', value: '売買' },
                  { label: '売却', value: '売却' },
                  { label: '購入', value: '購入' },
                ]}
                required
              />
              
              <Select
                label="貸借"
                value={formData.debitCredit}
                onChange={(e) => setFormData({ ...formData, debitCredit: e.target.value })}
                options={[
                  { label: '借方', value: '借方' },
                  { label: '貸方', value: '貸方' },
                ]}
                required
              />
              
              <DatePicker
                label="約定年月日"
                value={formData.contractDate}
                onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                required
              />
              
              <DatePicker
                label="受渡年月日"
                value={formData.receiptDate}
                onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                required
              />
              
              <Input
                label="部店"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              
              <Input
                label="開示番号"
                value={formData.openingNumber}
                onChange={(e) => setFormData({ ...formData, openingNumber: e.target.value })}
              />
              
              <Select
                label="投資区分"
                value={formData.investmentType}
                onChange={(e) => setFormData({ ...formData, investmentType: e.target.value })}
                options={[
                  { label: '売買目的', value: '売買目的' },
                  { label: '満期保有', value: '満期保有' },
                  { label: 'その他', value: 'その他' },
                ]}
              />
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleManualInput}>
                ➕ 登録
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* Data Table (for CSV upload results) */}
      {uploadMode && tableData.length > 0 && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">
                入力: <span className="font-semibold">{tableData.length}</span>
              </span>
              <span className="text-sm text-gray-600">
                エラー: <span className="font-semibold text-red-600">0</span>
              </span>
              <span className="text-sm text-gray-600">
                登録可: <span className="font-semibold text-green-600">{tableData.length}</span>
              </span>
            </div>
          </div>
          
          <Table
            columns={columns}
            data={tableData}
            selectable={true}
            selectedRows={selectedRows}
            onSelectRow={setSelectedRows}
          />
        </Card>
      )}
      
      {/* Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="アップロード結果"
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setShowResultModal(false)}>
              閉じる
            </Button>
          </div>
        }
      >
        {uploadResult && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <span className="font-semibold">{uploadResult.successCount}</span> 件のレコードが正常に登録されました
              </p>
            </div>
            
            {uploadResult.errorCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  <span className="font-semibold">{uploadResult.errorCount}</span> 件のエラーがありました
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
      
      {/* Error Content Section */}
      <Card title="エラー内容">
        <div className="text-center py-8 text-gray-500">
          エラーはありません
        </div>
      </Card>
    </div>
  );
};

export default ForceInput;
