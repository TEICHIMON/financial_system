# 项目架构说明文档

## 完整文件结构

```
financial-trading-system/
├── public/                          # 静态资源
├── src/
│   ├── app/                         # 应用核心
│   │   ├── store/                   # Redux 状态管理
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js    # 认证状态
│   │   │   │   └── uiSlice.js      # UI状态
│   │   │   └── index.js            # Store配置
│   │   ├── router/
│   │   │   └── index.jsx           # 路由配置
│   │   ├── api/
│   │   │   ├── request.js          # Axios配置
│   │   │   └── mock.js             # Mock初始化
│   │   └── App.jsx                 # 主应用组件
│   │
│   ├── pages/                       # 页面组件（高内聚设计）
│   │   ├── Login/                   # 登录页
│   │   │   ├── hooks/
│   │   │   │   └── useLogin.js
│   │   │   ├── api.js
│   │   │   ├── mock.js
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── Home/                    # 首页
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   │
│   │   ├── TransactionManagement/  # 取引管理
│   │   │   ├── TransactionDetail/  # 取引明細照会（完整实现）
│   │   │   │   ├── components/
│   │   │   │   │   ├── SearchPanel.jsx     # 搜索面板
│   │   │   │   │   ├── ResultTable.jsx     # 结果表格
│   │   │   │   │   ├── DetailModal.jsx     # 详情弹窗
│   │   │   │   │   └── ExportButton.jsx    # 导出按钮
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useTransactionSearch.js
│   │   │   │   │   └── useTransactionDetail.js
│   │   │   │   ├── store/
│   │   │   │   │   └── transactionDetailSlice.js
│   │   │   │   ├── api.js
│   │   │   │   ├── mock.js
│   │   │   │   ├── constants.js
│   │   │   │   ├── index.jsx
│   │   │   │   └── index.css
│   │   │   │
│   │   │   ├── ForceInput/         # 強制入力（完整实现）
│   │   │   │   ├── api.js
│   │   │   │   ├── mock.js
│   │   │   │   ├── constants.js
│   │   │   │   ├── index.jsx
│   │   │   │   └── index.css
│   │   │   │
│   │   │   ├── ForceInputHistory/  # 履歴照会（占位符）
│   │   │   │   └── index.jsx
│   │   │   │
│   │   │   ├── index.jsx           # 取引管理主页
│   │   │   └── index.css
│   │   │
│   │   ├── BalanceManagement/      # 残高損益管理（占位符）
│   │   │   └── index.jsx
│   │   │
│   │   ├── MarketValueManagement/  # 時価管理（占位符）
│   │   │   └── index.jsx
│   │   │
│   │   └── ApprovalManagement/     # 承認管理（占位符）
│   │       └── index.jsx
│   │
│   ├── shared/                      # 共享资源
│   │   ├── components/
│   │   │   └── Layout/
│   │   │       ├── MainLayout/     # 主布局
│   │   │       │   ├── index.jsx
│   │   │       │   └── index.css
│   │   │       └── PageHeader/     # 页面标题栏
│   │   │           ├── index.jsx
│   │   │           └── index.css
│   │   ├── hooks/                  # 共享hooks
│   │   ├── utils/                  # 工具函数
│   │   │   ├── format.js          # 格式化工具
│   │   │   └── validation.js      # 验证工具
│   │   └── constants/              # 全局常量
│   │       ├── routes.js          # 路由常量
│   │       └── menu.js            # 菜单配置
│   │
│   ├── assets/                      # 静态资源
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── styles/                      # 全局样式
│   │   └── global.css
│   │
│   └── main.jsx                     # 入口文件
│
├── .env                             # 环境变量
├── package.json                     # 依赖配置
├── vite.config.js                   # Vite配置
├── tailwind.config.js               # Tailwind配置
├── index.html                       # HTML模板
└── README.md                        # 项目文档
```

## 核心设计模式

### 1. 高内聚页面结构（Next.js风格）
每个页面是一个自包含的模块：
- 相关代码集中在一个文件夹
- 对外暴露单一入口（index.jsx）
- 内部按职能划分（components、hooks、store等）

**优势：**
- 易于定位和修改
- 减少文件间依赖
- 便于团队协作
- 支持代码分割

### 2. UI/数据分离

#### Pages层（UI组合）
```jsx
const TransactionDetail = () => {
  // 只负责组合UI和调用hooks
  const { data, loading, handleSearch } = useTransactionSearch();
  
  return (
    <>
      <SearchPanel onSearch={handleSearch} />
      <ResultTable data={data} loading={loading} />
    </>
  );
};
```

#### Hooks层（业务逻辑）
```javascript
export const useTransactionSearch = () => {
  const dispatch = useDispatch();
  // 所有业务逻辑都在这里
  const handleSearch = (params) => {
    dispatch(fetchTransactions(params));
  };
  return { handleSearch };
};
```

#### Store层（状态管理）
```javascript
const slice = createSlice({
  name: 'transactionDetail',
  initialState: { list: [], loading: false },
  reducers: { /* ... */ },
});
```

### 3. Mock数据策略

每个页面管理自己的mock数据：
```javascript
// pages/TransactionDetail/mock.js
export const setupTransactionDetailMock = () => {
  Mock.mock(/\/api\/transactions/, 'post', { /* ... */ });
};

// app/api/mock.js (统一初始化)
setupLoginMock();
setupTransactionDetailMock();
```

## 数据流

```
用户操作
  ↓
Page Component (UI)
  ↓
Custom Hook (业务逻辑)
  ↓
Redux Action (状态管理)
  ↓
API Call (数据请求)
  ↓
Mock.js (开发环境) / Real API (生产环境)
```

## 路由设计

### 主应用路由
- 使用 MainLayout 包裹
- 包含 Header、Sidebar
- 适用于主要功能页面

### 弹出窗口路由
- 不使用 MainLayout
- 独立的页面布局
- 适用于详情页、表单页
- 使用 `window.open()` 打开

## 状态管理策略

### 全局状态（Redux）
- 认证信息（auth）
- UI状态（ui）
- 跨页面共享的数据

### 页面状态（Redux Slice）
- 页面特定的数据（如表格数据）
- 页面特定的加载状态
- 页面特定的筛选条件

### 本地状态（useState）
- 表单输入
- 弹窗显示/隐藏
- 临时UI状态

## 样式策略

### 全局样式
- `src/styles/global.css` - 基础样式和CSS变量

### 组件样式
1. **Ant Design** - 主要UI组件
2. **Tailwind CSS** - 实用类（布局、间距等）
3. **CSS Modules** - 页面特定样式

### 避免样式冲突
- Tailwind 禁用 preflight
- 使用 CSS Module 或 scoped styles
- BEM命名规范

## 开发工作流

### 添加新功能页面

1. **创建页面目录**
```bash
mkdir -p src/pages/NewFeature/{components,hooks,store}
```

2. **创建必要文件**
- index.jsx (页面组件)
- api.js (API定义)
- mock.js (Mock数据)
- constants.js (常量)
- index.css (样式)

3. **实现功能**
- 创建UI组件
- 编写业务逻辑hooks
- 配置状态管理
- 设置Mock数据

4. **集成到应用**
- 添加路由
- 更新菜单（如需要）
- 添加Redux reducer（如需要）

### 代码审查检查点

✅ UI组件是否纯粹（无业务逻辑）  
✅ 业务逻辑是否在hooks中  
✅ 状态管理是否合理  
✅ API调用是否有错误处理  
✅ Mock数据是否完整  
✅ 样式是否符合设计规范  
✅ 代码是否有适当的注释  

## 性能优化建议

1. **路由懒加载**
```javascript
const TransactionDetail = lazy(() => 
  import('@/pages/TransactionManagement/TransactionDetail')
);
```

2. **组件Memo化**
```javascript
const ExpensiveComponent = memo(({ data }) => {
  // ...
});
```

3. **虚拟滚动**（大数据表格）
```javascript
import { List } from 'react-virtualized';
```

4. **防抖/节流**
```javascript
const debouncedSearch = debounce(handleSearch, 300);
```

## 测试策略

### 单元测试（推荐）
- 使用 Jest + React Testing Library
- 测试 hooks 和工具函数
- 测试 Redux reducers

### 集成测试
- 测试完整的用户流程
- 测试页面交互

### E2E测试
- 使用 Playwright 或 Cypress
- 测试关键业务流程

## 部署注意事项

1. **环境变量**
   - 开发：.env
   - 生产：.env.production

2. **构建优化**
   - 代码分割
   - Tree shaking
   - 资源压缩

3. **静态资源**
   - CDN部署
   - 缓存策略

## 常见问题

### Q: 为什么使用 HashRouter？
A: 简化部署，不需要服务器端路由配置。

### Q: 如何切换到真实API？
A: 移除 `src/app/api/mock.js` 的导入，配置正确的 `VITE_API_BASE_URL`。

### Q: 如何添加新的Redux状态？
A: 在页面的 `store/` 目录创建slice，然后在 `app/store/index.js` 中注册。

### Q: 组件太大怎么办？
A: 按功能拆分为更小的子组件，放在 `components/` 目录。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request
5. 代码审查
6. 合并到主分支

---

**文档版本**: 1.0  
**最后更新**: 2025-10-22  
**维护者**: 开发团队
