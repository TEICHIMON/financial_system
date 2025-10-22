import request from '@/app/api/request';

const BASE_URL = '/transactions';

export const searchTransactions = (params) => {
  return request.post(`${BASE_URL}/search`, params);
};

export const getTransactionDetail = (id) => {
  return request.get(`${BASE_URL}/${id}`);
};

export const exportTransactions = (ids) => {
  return request.post(`${BASE_URL}/export`, { ids }, {
    responseType: 'blob',
  });
};

export const deleteTransaction = (id) => {
  return request.delete(`${BASE_URL}/${id}`);
};

export const updateTransaction = (id, data) => {
  return request.put(`${BASE_URL}/${id}`, data);
};
