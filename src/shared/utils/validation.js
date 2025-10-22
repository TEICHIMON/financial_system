import dayjs from 'dayjs';

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Japanese format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^0\d{9,10}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate date range (start date should be before end date)
 */
export const isValidDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true;
  return dayjs(startDate).isBefore(dayjs(endDate)) || dayjs(startDate).isSame(dayjs(endDate));
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  return value !== null && value !== undefined && value !== '';
};

/**
 * Validate number range
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Validate file size (in MB)
 */
export const isValidFileSize = (file, maxSizeMB = 10) => {
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
  return file.size <= maxSize;
};

/**
 * Validate file type
 */
export const isValidFileType = (file, allowedTypes = []) => {
  if (allowedTypes.length === 0) return true;
  return allowedTypes.includes(file.type);
};

/**
 * Validate CSV file
 */
export const isValidCSV = (file) => {
  return file.type === 'text/csv' || file.name.endsWith('.csv');
};

/**
 * Common form validation rules for Ant Design Form
 */
export const VALIDATION_RULES = {
  required: {
    required: true,
    message: 'この項目は必須です',
  },
  email: {
    type: 'email',
    message: '有効なメールアドレスを入力してください',
  },
  phone: {
    pattern: /^0\d{9,10}$/,
    message: '有効な電話番号を入力してください',
  },
  positiveNumber: {
    pattern: /^\d+(\.\d+)?$/,
    message: '正の数値を入力してください',
  },
  maxLength: (max) => ({
    max,
    message: `${max}文字以内で入力してください`,
  }),
  minLength: (min) => ({
    min,
    message: `${min}文字以上で入力してください`,
  }),
};

export default {
  isValidEmail,
  isValidPhone,
  isValidDateRange,
  isRequired,
  isInRange,
  isValidFileSize,
  isValidFileType,
  isValidCSV,
  VALIDATION_RULES,
};
