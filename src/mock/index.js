import Mock from 'mockjs';

// 配置 Mock
Mock.setup({
  timeout: '200-600',
});

// 生成随机交易数据
const generateTransactions = (count = 50) => {
  const transactions = [];
  const statuses = ['申請中', '承認済', '却下', '取消'];
  const sourceSystem = ['NORMAL', 'CANCEL', 'TEST'];
  const tradeTypes = ['取引開始', '新規', '修正'];
  const sellers = ['売買', '売却', '購入'];
  const applicants = ['AGRAHAMA', 'test', 'USER001', 'USER002'];
  
  for (let i = 0; i < count; i++) {
    const date = Mock.Random.date('yyyy/MM/dd');
    const time = Mock.Random.time('HH:mm:ss');
    const status = Mock.Random.pick(statuses);
    
    transactions.push({
      id: Mock.Random.id(),
      ruppsTransactionId: `${Mock.Random.date('yyyyMMdd')}${Mock.mock('@integer(100000, 999999)')}`,
      sourceSystem: Mock.Random.pick(sourceSystem),
      ruppsTradeId: Mock.mock('@integer(1000000, 9999999)'),
      tradeType: Mock.Random.pick(tradeTypes),
      seller: Mock.Random.pick(sellers),
      debitCredit: Mock.Random.pick(['借方', '貸方']),
      settlement: Mock.Random.pick(['決済', '未決済']),
      settlementCode: Mock.mock('@string("upper", 10, 15)'),
      applicant: Mock.Random.pick(applicants),
      applicationDate: date,
      applicationTime: time,
      approvalDate: status === '承認済' ? Mock.Random.date('yyyy/MM/dd') : null,
      department: Mock.Random.pick(['営業部', '管理部', '経理部', '総務部']),
      branchOffice: Mock.Random.pick(['東京', '大阪', '名古屋', '福岡']),
      openingDate: Mock.Random.date('yyyy/MM/dd'),
      memo: Mock.Random.cparagraph(1, 3),
      status: status,
      requestId: `REQ${Mock.mock('@integer(100000, 999999)')}`,
      detail: Mock.Random.string('upper', 50, 100),
      createdAt: `${date} ${time}`,
      updatedAt: Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
    });
  }
  
  return transactions;
};

// 生成随机审批数据
const generateApprovals = (count = 30) => {
  const approvals = [];
  const statuses = ['申請中', '承認済', '却下'];
  const applicants = ['AGRAHAMA', 'test', 'USER001', 'USER002'];
  
  for (let i = 0; i < count; i++) {
    const status = Mock.Random.pick(statuses);
    const applicant = Mock.Random.pick(applicants);
    
    approvals.push({
      id: Mock.Random.id(),
      requestId: `REQ${Mock.mock('@integer(100000, 999999)')}`,
      transactionId: Mock.mock('@integer(1000000, 9999999)'),
      applicant: applicant,
      applicantName: Mock.Random.cname(),
      applicationDate: Mock.Random.date('yyyy/MM/dd'),
      applicationTime: Mock.Random.time('HH:mm:ss'),
      approver: status !== '申請中' ? Mock.Random.cname() : null,
      approvalDate: status !== '申請中' ? Mock.Random.date('yyyy/MM/dd') : null,
      status: status,
      comment: Mock.Random.cparagraph(1, 2),
      type: Mock.Random.pick(['新規', '修正', '削除']),
      department: Mock.Random.pick(['営業部', '管理部', '経理部', '総務部']),
      priority: Mock.Random.pick(['高', '中', '低']),
    });
  }
  
  return approvals;
};

// 生成用户数据
const generateUsers = () => {
  return [
    {
      id: 'B1125825',
      username: 'admin',
      name: 'Administrator',
      email: 'admin@rupps.com',
      role: 'admin',
      department: '管理部',
      status: 'active',
    },
    {
      id: 'B1125826',
      username: 'user01',
      name: 'AGRAHAMA',
      email: 'agrahama@rupps.com',
      role: 'user',
      department: '営業部',
      status: 'active',
    },
    {
      id: 'B1125827',
      username: 'user02',
      name: 'TEST USER',
      email: 'test@rupps.com',
      role: 'user',
      department: '経理部',
      status: 'active',
    },
  ];
};

// Mock API - 获取交易列表
Mock.mock(/\/rupps\/transactions\?.*/, 'get', (options) => {
  const url = new URL('http://localhost' + options.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const pageSize = parseInt(url.searchParams.get('pageSize')) || 10;
  const status = url.searchParams.get('status');
  const keyword = url.searchParams.get('keyword');
  
  let transactions = generateTransactions(100);
  
  // 过滤
  if (status) {
    transactions = transactions.filter(t => t.status === status);
  }
  
  if (keyword) {
    transactions = transactions.filter(t => 
      t.ruppsTransactionId.includes(keyword) ||
      t.applicant.includes(keyword) ||
      t.requestId.includes(keyword)
    );
  }
  
  // 分页
  const total = transactions.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = transactions.slice(start, end);
  
  return {
    code: 200,
    success: true,
    data: {
      list: data,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
});

// Mock API - 获取审批列表
Mock.mock(/\/rupps\/approvals\?.*/, 'get', (options) => {
  const url = new URL('http://localhost' + options.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const pageSize = parseInt(url.searchParams.get('pageSize')) || 10;
  
  const approvals = generateApprovals(50);
  
  const total = approvals.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = approvals.slice(start, end);
  
  return {
    code: 200,
    success: true,
    data: {
      list: data,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
});

// Mock API - 登录
Mock.mock('/auth/login', 'post', (options) => {
  console.log("login")
  const { username, password } = JSON.parse(options.body);
  
  if (username === 'admin' && password === 'admin') {
    return {
      code: 200,
      success: true,
      data: {
        token: Mock.Random.guid(),
        user: {
          id: 'B1125825',
          username: 'admin',
          name: 'Administrator',
          email: 'admin@rupps.com',
          role: 'admin',
          department: '管理部',
        },
      },
      message: 'Login successful',
    };
  }
  
  return {
    code: 401,
    success: false,
    message: 'Invalid username or password',
  };
});

// Mock API - 获取当前用户
Mock.mock('/auth/user', 'get', {
  code: 200,
  success: true,
  data: {
    id: 'B1125825',
    username: 'admin',
    name: 'Administrator',
    email: 'admin@rupps.com',
    role: 'admin',
    department: '管理部',
  },
});

// Mock API - 审批操作
Mock.mock(/\/rupps\/approvals\/\d+\/(approve|reject)/, 'post', {
  code: 200,
  success: true,
  message: 'Operation successful',
});

// Mock API - 强制输入交易
Mock.mock('/rupps/transactions/force-input', 'post', {
  code: 200,
  success: true,
  data: {
    id: Mock.Random.id(),
    transactionId: Mock.mock('@integer(1000000, 9999999)'),
  },
  message: 'Transaction created successfully',
});

// Mock API - 上传 CSV
Mock.mock('/rupps/transactions/upload', 'post', {
  code: 200,
  success: true,
  data: {
    successCount: Mock.mock('@integer(50, 100)'),
    errorCount: Mock.mock('@integer(0, 10)'),
  },
  message: 'Upload completed',
});

// Mock API - 导出 CSV
Mock.mock(/\/rupps\/transactions\/export/, 'get', {
  code: 200,
  success: true,
  message: 'Export successful',
});

console.log('Mock data initialized');

export { generateTransactions, generateApprovals, generateUsers };
