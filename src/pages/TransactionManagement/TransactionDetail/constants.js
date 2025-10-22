export const PAGE_TITLE = '取引明細照会画面';

export const TRANSACTION_STATUS = {
  PENDING: '未承認',
  APPROVED: '承認済',
  REJECTED: '却下',
  CANCELLED: 'キャンセル',
};

export const TRANSACTION_TYPE = {
  BUY: '買付',
  SELL: '売付',
  TRANSFER: '振替',
};

export const STATUS_OPTIONS = Object.entries(TRANSACTION_STATUS).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const TYPE_OPTIONS = Object.entries(TRANSACTION_TYPE).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const SEARCH_FORM_LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
