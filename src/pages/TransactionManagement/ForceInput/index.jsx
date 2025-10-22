import { useState } from 'react';
import { Upload, Button, Card, Alert, Select, Form, Space, Descriptions, Table, message } from 'antd';
import { UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { validateFile, uploadFile } from './api';
import PageHeader from '@/shared/components/Layout/PageHeader';
import { PAGE_TITLE, UPLOAD_STATUS } from './constants';
import './index.css';

const ForceInput = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [status, setStatus] = useState(UPLOAD_STATUS.IDLE);
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Keep only the last file
    
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setStatus(UPLOAD_STATUS.VALIDATING);
      setLoading(true);
      
      try {
        const response = await validateFile(file);
        setValidationResult(response.data);
        setStatus(response.data.valid ? UPLOAD_STATUS.READY : UPLOAD_STATUS.ERROR);
      } catch (error) {
        message.error('ファイル検証に失敗しました');
        setStatus(UPLOAD_STATUS.ERROR);
      } finally {
        setLoading(false);
      }
    } else {
      setStatus(UPLOAD_STATUS.IDLE);
      setValidationResult(null);
    }
  };

  const handleSubmit = async (values) => {
    if (!fileList[0]) {
      message.warning('ファイルを選択してください');
      return;
    }

    setLoading(true);
    setStatus(UPLOAD_STATUS.UPLOADING);

    try {
      const file = fileList[0].originFileObj;
      const response = await uploadFile(file, values.approver);
      
      message.success('アップロードが完了しました');
      setStatus(UPLOAD_STATUS.SUCCESS);
      
      // Reset after success
      setTimeout(() => {
        setFileList([]);
        setValidationResult(null);
        setStatus(UPLOAD_STATUS.IDLE);
        form.resetFields();
      }, 3000);
    } catch (error) {
      message.error('アップロードに失敗しました');
      setStatus(UPLOAD_STATUS.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const errorColumns = [
    { title: '行', dataIndex: 'row', key: 'row', width: 80 },
    { title: '列', dataIndex: 'column', key: 'column', width: 150 },
    { title: 'エラー内容', dataIndex: 'message', key: 'message' },
  ];

  const canUpload = status === UPLOAD_STATUS.READY && validationResult?.valid;

  return (
    <div className="force-input-page">
      <PageHeader 
        title={PAGE_TITLE}
        onClose={() => window.close()}
      />
      
      <div className="page-content">
        <Card title="ファイルアップロード" className="section-card">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="CSVファイル">
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                accept=".csv"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} disabled={loading}>
                  ファイルを選択
                </Button>
              </Upload>
            </Form.Item>

            {validationResult && (
              <Card size="small" className="validation-result">
                <Descriptions column={3} size="small">
                  <Descriptions.Item label="総件数">
                    {validationResult.totalRecords}
                  </Descriptions.Item>
                  <Descriptions.Item label="エラー件数">
                    <span style={{ color: validationResult.errorCount > 0 ? 'red' : 'green' }}>
                      {validationResult.errorCount}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="登録可否">
                    {validationResult.valid ? (
                      <span style={{ color: 'green' }}>
                        <CheckCircleOutlined /> 可
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        <CloseCircleOutlined /> 否
                      </span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}

            {validationResult?.errors && validationResult.errors.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Alert
                  message="エラー内容"
                  description={
                    <Table
                      columns={errorColumns}
                      dataSource={validationResult.errors}
                      pagination={false}
                      size="small"
                      rowKey={(record, index) => index}
                    />
                  }
                  type="error"
                  showIcon
                />
              </div>
            )}

            <Form.Item
              label="承認者選択"
              name="approver"
              rules={[{ required: true, message: '承認者を選択してください' }]}
              style={{ marginTop: 24 }}
            >
              <Select placeholder="承認者を選択" disabled={!canUpload}>
                <Select.Option value="approver1">承認者A</Select.Option>
                <Select.Option value="approver2">承認者B</Select.Option>
                <Select.Option value="approver3">承認者C</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!canUpload}
                  loading={loading && status === UPLOAD_STATUS.UPLOADING}
                >
                  登録
                </Button>
                <Button onClick={() => {
                  setFileList([]);
                  setValidationResult(null);
                  setStatus(UPLOAD_STATUS.IDLE);
                  form.resetFields();
                }}>
                  クリア
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ForceInput;
