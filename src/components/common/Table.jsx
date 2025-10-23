import React from 'react';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  onRowClick = null,
  selectedRows = [],
  onSelectRow = null,
  selectable = false,
  emptyText = 'データがありません',
  className = '',
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectRow(data.map(row => row.id));
    } else {
      onSelectRow([]);
    }
  };
  
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      onSelectRow(selectedRows.filter(rowId => rowId !== id));
    } else {
      onSelectRow([...selectedRows, id]);
    }
  };
  
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {emptyText}
      </div>
    );
  }
  
  return (
    <div className={`overflow-x-auto custom-scrollbar ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary-600">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}
              `}
            >
              {selectable && (
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={column.key || colIndex}
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render 
                    ? column.render(row[column.dataIndex], row, rowIndex)
                    : row[column.dataIndex]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
