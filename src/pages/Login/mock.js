import Mock from 'mockjs';

export const setupLoginMock = () => {
  // Login API
  Mock.mock(/\/api\/auth\/login/, 'post', (options) => {
    const { username, password } = JSON.parse(options.body);
    
    // Simple validation - accept any username with password "123456"
    if (password === '123456') {
      return {
        code: 200,
        message: 'ログイン成功',
        data: {
          token: Mock.Random.guid(),
          user: {
            id: Mock.Random.id(),
            username: username,
            name: username === 'admin' ? '管理者' : 'ユーザー',
            email: `${username}@example.com`,
            role: username === 'admin' ? 'admin' : 'user',
          },
        },
      };
    } else {
      return {
        code: 401,
        message: 'ユーザー名またはパスワードが正しくありません',
        data: null,
      };
    }
  });

  // Logout API
  Mock.mock(/\/api\/auth\/logout/, 'post', {
    code: 200,
    message: 'ログアウト成功',
    data: null,
  });

  // Get user info API
  Mock.mock(/\/api\/auth\/user/, 'get', {
    code: 200,
    message: '成功',
    data: {
      id: '@id',
      username: 'admin',
      name: '管理者',
      email: 'admin@example.com',
      role: 'admin',
    },
  });
};
