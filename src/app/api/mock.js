import Mock from 'mockjs';
import { setupLoginMock } from '@/pages/Login/mock';
import { setupTransactionDetailMock } from '@/pages/TransactionManagement/TransactionDetail/mock';
import { setupForceInputMock } from '@/pages/TransactionManagement/ForceInput/mock';

// Configure Mock.js
Mock.setup({
  timeout: '200-600', // Simulate network delay
});

// Initialize all mocks in development mode
if (import.meta.env.DEV) {
  console.log('🎭 Initializing Mock.js...');
  
  setupLoginMock();
  setupTransactionDetailMock();
  setupForceInputMock();
  
  console.log('✅ Mock.js initialized successfully');
}

export default Mock;
