import Mock from 'mockjs';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from './constants';

export const setupTransactionDetailMock = () => {
  // Search API
  Mock.mock(/\/api\/transactions\/search/, 'post', (options) => {
    const { page = 1, pageSize = 20 } = JSON.parse(options.body);
    
    return {
      code: 200,
      message: '成功',
      data: {
        list: Mock.mock({
          [`items|${pageSize}`]: [{
            'id|+1': 1000,
            transactionNo: () => Mock.Random.guid().substring(0, 18),
            date: '@date("yyyy-MM-dd")',
            'amount|10000-9999999': 1,
            'status|1': Object.keys(TRANSACTION_STATUS),
            customerName: '@cname',
            customerCode: () => 'C' + Mock.Random.string('number', 6),
            'type|1': Object.keys(TRANSACTION_TYPE),
            approver: '@cname',
            createdAt: '@datetime',
            updatedAt: '@datetime',
          }]
        }).items,
        total: 487,
        page,
        pageSize,
      }
    };
  });

  // Detail API
  Mock.mock(/\/api\/transactions\/\d+/, 'get', (options) => {
    const id = options.url.match(/\/(\d+)/)[1];
    
    return {
      code: 200,
      message: '成功',
      data: Mock.mock({
        id: Number(id),
        transactionNo: () => Mock.Random.guid().substring(0, 18),
        date: '@datetime',
        'amount|100000-9999999': 1,
        customerName: '@cname',
        customerCode: () => 'C' + Mock.Random.string('number', 6),
        'type|1': Object.keys(TRANSACTION_TYPE),
        'status|1': Object.keys(TRANSACTION_STATUS),
        description: '@cparagraph(1, 3)',
        securities: Mock.mock({
          'items|3-5': [{
            securityCode: () => Mock.Random.string('number', 4),
            securityName: '@ctitle(4, 8)',
            'quantity|100-10000.2': 1,
            'price|1000-50000.2': 1,
            'amount|50000-500000': 1,
          }]
        }).items,
        history: {
          createdBy: '@cname',
          createdAt: '@datetime',
          updatedBy: '@cname',
          updatedAt: '@datetime',
          approvedBy: '@cname',
          approvedAt: '@datetime',
        },
        remarks: '@cparagraph(1, 2)',
      })
    };
  });

  // Export API
  Mock.mock(/\/api\/transactions\/export/, 'post', {
    code: 200,
    message: 'エクスポート成功',
    data: {
      filename: 'transactions_export.csv',
      url: '/downloads/transactions_export.csv',
    }
  });

  // Delete API
  Mock.mock(/\/api\/transactions\/\d+/, 'delete', {
    code: 200,
    message: '削除成功',
    data: null,
  });

  // Update API
  Mock.mock(/\/api\/transactions\/\d+/, 'put', {
    code: 200,
    message: '更新成功',
    data: null,
  });
};
