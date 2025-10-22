import {
  HomeOutlined,
  TransactionOutlined,
  DollarOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ROUTES from './routes';

export const MENU_ITEMS = [
  {
    key: 'home',
    path: ROUTES.HOME,
    icon: HomeOutlined,
    label: 'ホーム',
  },
  {
    key: 'transaction',
    path: ROUTES.TRANSACTION_MANAGEMENT,
    icon: TransactionOutlined,
    label: '取引管理',
  },
  {
    key: 'balance',
    path: ROUTES.BALANCE_MANAGEMENT,
    icon: DollarOutlined,
    label: '残高損益管理',
  },
  {
    key: 'market-value',
    path: ROUTES.MARKET_VALUE_MANAGEMENT,
    icon: LineChartOutlined,
    label: '時価管理',
  },
  {
    key: 'approval',
    path: ROUTES.APPROVAL_MANAGEMENT,
    icon: CheckCircleOutlined,
    label: '承認管理',
  },
];

export default MENU_ITEMS;
