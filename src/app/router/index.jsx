import { createHashRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/shared/components/Layout/MainLayout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import TransactionManagement from '@/pages/TransactionManagement';
import TransactionDetail from '@/pages/TransactionManagement/TransactionDetail';
import ForceInput from '@/pages/TransactionManagement/ForceInput';
import ForceInputHistory from '@/pages/TransactionManagement/ForceInputHistory';
import BalanceManagement from '@/pages/BalanceManagement';
import MarketValueManagement from '@/pages/MarketValueManagement';
import ApprovalManagement from '@/pages/ApprovalManagement';
import ROUTES from '@/shared/constants/routes';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return children;
};

const router = createHashRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.TRANSACTION_MANAGEMENT,
        element: <TransactionManagement />,
      },
      {
        path: ROUTES.BALANCE_MANAGEMENT,
        element: <BalanceManagement />,
      },
      {
        path: ROUTES.MARKET_VALUE_MANAGEMENT,
        element: <MarketValueManagement />,
      },
      {
        path: ROUTES.APPROVAL_MANAGEMENT,
        element: <ApprovalManagement />,
      },
    ],
  },
  // Sub-pages that open in new windows
  {
    path: ROUTES.TRANSACTION_DETAIL,
    element: (
      <ProtectedRoute>
        <TransactionDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TRANSACTION_FORCE_INPUT,
    element: (
      <ProtectedRoute>
        <ForceInput />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TRANSACTION_FORCE_INPUT_HISTORY,
    element: (
      <ProtectedRoute>
        <ForceInputHistory />
      </ProtectedRoute>
    ),
  },
]);

export default router;
