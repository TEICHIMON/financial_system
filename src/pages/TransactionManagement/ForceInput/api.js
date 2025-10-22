import request from '@/app/api/request';

const BASE_URL = '/force-input';

export const validateFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post(`${BASE_URL}/validate`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadFile = (file, approver) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('approver', approver);
  return request.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
