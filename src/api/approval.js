import api from './request';

// 获取审批列表
export const getApprovalList = (params) => {
  return api.get('/rupps/approvals', { params });
};

// 获取审批详情
export const getApprovalDetail = (id) => {
  return api.get(`/rupps/approvals/${id}`);
};

// 审批通过
export const approveRequest = (id, comment) => {
  return api.post(`/rupps/approvals/${id}/approve`, { comment });
};

// 审批拒绝
export const rejectRequest = (id, comment) => {
  return api.post(`/rupps/approvals/${id}/reject`, { comment });
};

// 批量审批
export const batchApprove = (ids, action, comment) => {
  return api.post('/rupps/approvals/batch', { ids, action, comment });
};

// 获取审批历史
export const getApprovalHistory = (transactionId) => {
  return api.get(`/rupps/approvals/history/${transactionId}`);
};
