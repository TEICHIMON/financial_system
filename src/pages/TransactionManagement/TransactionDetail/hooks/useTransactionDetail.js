import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getTransactionDetail } from '../api';

export const useTransactionDetail = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShowDetail = useCallback(async (record) => {
    setLoading(true);
    try {
      const response = await getTransactionDetail(record.id);
      setDetailData(response.data);
      setDetailVisible(true);
    } catch (error) {
      message.error('詳細情報の取得に失敗しました');
      console.error('Failed to fetch detail:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailVisible(false);
    setDetailData(null);
  }, []);

  return {
    detailVisible,
    detailData,
    loading,
    handleShowDetail,
    handleCloseDetail,
  };
};
