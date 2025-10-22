import { Form, Input, Select, DatePicker, Button, Row, Col, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { STATUS_OPTIONS, TYPE_OPTIONS, SEARCH_FORM_LAYOUT } from '../constants';

const { RangePicker } = DatePicker;

const SearchPanel = ({ onSearch, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Convert date range to separate start/end dates
    const params = { ...values };
    if (values.dateRange) {
      params.startDate = values.dateRange[0]?.format('YYYY-MM-DD');
      params.endDate = values.dateRange[1]?.format('YYYY-MM-DD');
      delete params.dateRange;
    }
    onSearch(params);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="検索条件" className="search-panel section-card">
      <Form
        form={form}
        {...SEARCH_FORM_LAYOUT}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="transactionNo" label="取引番号">
              <Input placeholder="取引番号を入力" allowClear />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="customerCode" label="顧客コード">
              <Input placeholder="顧客コードを入力" allowClear />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="customerName" label="顧客名">
              <Input placeholder="顧客名を入力" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="status" label="ステータス">
              <Select 
                placeholder="選択してください" 
                allowClear
                options={STATUS_OPTIONS}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="type" label="取引種類">
              <Select 
                placeholder="選択してください" 
                allowClear
                options={TYPE_OPTIONS}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="dateRange" label="取引日">
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button 
              onClick={handleReset} 
              style={{ marginRight: 8 }}
              icon={<ReloadOutlined />}
            >
              リセット
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SearchOutlined />}
            >
              検索
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchPanel;
