import { format, parse, isValid } from 'date-fns';

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期
 * @param {string} formatStr - 格式字符串
 * @returns {string} - 格式化后的日期字符串
 */
export const formatDate = (date, formatStr = 'yyyy/MM/dd') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatStr);
};

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期时间
 * @returns {string} - 格式化后的日期时间字符串
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'yyyy/MM/dd HH:mm:ss');
};

/**
 * 解析日期字符串
 * @param {string} dateStr - 日期字符串
 * @param {string} formatStr - 格式字符串
 * @returns {Date|null} - 日期对象或 null
 */
export const parseDate = (dateStr, formatStr = 'yyyy/MM/dd') => {
  if (!dateStr) return null;
  
  try {
    const date = parse(dateStr, formatStr, new Date());
    return isValid(date) ? date : null;
  } catch (error) {
    console.error('Date parse error:', error);
    return null;
  }
};

/**
 * 下载文件
 * @param {Blob} blob - 文件数据
 * @param {string} filename - 文件名
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * 格式化数字
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数
 * @returns {string} - 格式化后的数字字符串
 */
export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  
  return Number(num).toLocaleString('ja-JP', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * 格式化货币
 * @param {number} amount - 金额
 * @param {string} currency - 货币符号
 * @returns {string} - 格式化后的货币字符串
 */
export const formatCurrency = (amount, currency = '¥') => {
  return `${currency}${formatNumber(amount, 0)}`;
};

/**
 * 深拷贝对象
 * @param {any} obj - 要拷贝的对象
 * @returns {any} - 拷贝后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
};

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间(ms)
 * @returns {Function} - 防抖后的函数
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间(ms)
 * @returns {Function} - 节流后的函数
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * 生成唯一 ID
 * @returns {string} - 唯一 ID
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} - 是否有效
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} - 扩展名
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * 将对象转换为查询字符串
 * @param {Object} params - 参数对象
 * @returns {string} - 查询字符串
 */
export const objectToQueryString = (params) => {
  return Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};
