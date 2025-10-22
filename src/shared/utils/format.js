import dayjs from 'dayjs';

/**
 * Format currency in Japanese Yen
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('ja-JP').format(num);
};

/**
 * Format date
 */
export const formatDate = (date, format = 'YYYY年MM月DD日') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

/**
 * Format datetime
 */
export const formatDateTime = (date, format = 'YYYY年MM月DD日 HH:mm:ss') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

/**
 * Format date for API (ISO format)
 */
export const formatDateForAPI = (date) => {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD');
};

/**
 * Parse date from API
 */
export const parseDateFromAPI = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString);
};

/**
 * Get date range (start and end of month)
 */
export const getMonthRange = (date = new Date()) => {
  const start = dayjs(date).startOf('month');
  const end = dayjs(date).endOf('month');
  return [start, end];
};

/**
 * Check if date is valid
 */
export const isValidDate = (date) => {
  return dayjs(date).isValid();
};

export default {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  formatDateForAPI,
  parseDateFromAPI,
  getMonthRange,
  isValidDate,
};
