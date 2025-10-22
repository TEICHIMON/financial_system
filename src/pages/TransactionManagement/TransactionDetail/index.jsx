import { useEffect } from 'react';
import { Space } from 'antd';
import { useTransactionSearch } from './hooks/useTransactionSearch';
import { useTransactionDetail } from './hooks/useTransactionDetail';
import SearchPanel from './components/SearchPanel';
import ResultTable from './components/ResultTable';
import DetailModal from './components/DetailModal';
import ExportButton from './components/ExportButton';
import PageHeader from '@/shared/components/Layout/PageHeader';
import { PAGE_TITLE } from './constants';
import './index.css';

const TransactionDetail = () => {
  const { 
    searchData, 
    loading, 
    handleSearch, 
    handlePageChange,
    handleRefresh,
  } = useTransactionSearch();
  
  const { 
    detailVisible, 
    detailData,
    loading: detailLoading,
    handleShowDetail, 
    handleCloseDetail 
  } = useTransactionDetail();

  // Initial load
  useEffect(() => {
    handleSearch({});
  }, []);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="transaction-detail-page">
      <PageHeader 
        title={PAGE_TITLE}
        onClose={handleClose}
        extra={
          <Space>
            <ExportButton data={searchData.list} />
          </Space>
        }
      />
      
      <div className="page-content">
        <SearchPanel 
          onSearch={handleSearch}
          loading={loading}
        />
        
        <ResultTable
          data={searchData.list}
          loading={loading}
          pagination={searchData.pagination}
          onPageChange={handlePageChange}
          onRowClick={handleShowDetail}
        />
      </div>
      
      <DetailModal
        visible={detailVisible}
        data={detailData}
        loading={detailLoading}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default TransactionDetail;
