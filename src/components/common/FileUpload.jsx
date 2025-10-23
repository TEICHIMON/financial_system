import React, { useRef } from 'react';
import Button from './Button';

const FileUpload = ({
  onFileSelect,
  accept = '.csv',
  label = 'ファイルを選択',
  buttonText = '参照',
  disabled = false,
  error = '',
  required = false,
  className = '',
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = React.useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        <input
          type="text"
          value={fileName}
          placeholder="ファイルが選択されていません"
          readOnly
          className={`
            flex-1 px-3 py-2 border rounded-md bg-gray-50
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          variant="secondary"
        >
          {buttonText}
        </Button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
