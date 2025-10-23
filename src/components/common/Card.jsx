import React from 'react';

const Card = ({
  title,
  children,
  footer = null,
  headerAction = null,
  className = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      
      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
