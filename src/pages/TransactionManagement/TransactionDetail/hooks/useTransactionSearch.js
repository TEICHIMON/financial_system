import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, setPage, setFilters } from '../store/transactionDetailSlice';

export const useTransactionSearch = () => {
  const dispatch = useDispatch();
  const { list, loading, pagination, filters } = useSelector(
    (state) => state.transactionDetail
  );

  const handleSearch = useCallback((searchParams) => {
    const params = {
      ...searchParams,
      page: 1,
      pageSize: pagination.pageSize,
    };
    dispatch(setFilters(searchParams));
    dispatch(fetchTransactions(params));
  }, [dispatch, pagination.pageSize]);

  const handlePageChange = useCallback((page, pageSize) => {
    dispatch(setPage({ page, pageSize }));
    dispatch(fetchTransactions({ ...filters, page, pageSize }));
  }, [dispatch, filters]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchTransactions({ 
      ...filters, 
      page: pagination.current, 
      pageSize: pagination.pageSize 
    }));
  }, [dispatch, filters, pagination]);

  return {
    searchData: { list, pagination },
    loading,
    handleSearch,
    handlePageChange,
    handleRefresh,
  };
};
