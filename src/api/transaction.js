import api from './request';

// 获取交易明细列表
export const getTransactionList = (params) => {
  return api.get('/rupps/transactions', { params });
};

// 获取交易详情
export const getTransactionDetail = (id) => {
  return api.get(`/rupps/transactions/${id}`);
};

// 导出交易数据为 CSV
export const exportTransactionCSV = (params) => {
  return api.get('/rupps/transactions/export', {
    params,
    responseType: 'blob',
  });
};

// 上传交易数据
export const uploadTransactionCSV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/rupps/transactions/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 强制输入交易
export const forceInputTransaction = (data) => {
  return api.post('/rupps/transactions/force-input', data);
};

// 批量删除交易
export const deleteTransactions = (ids) => {
  return api.delete('/rupps/transactions', { data: { ids } });
};

// 更新交易状态
export const updateTransactionStatus = (id, status) => {
  return api.put(`/rupps/transactions/${id}/status`, { status });
};
