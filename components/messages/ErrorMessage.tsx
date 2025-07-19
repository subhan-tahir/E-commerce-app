import React, { useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
  setErrorMessage,
}) => {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timeout); // cleanup on unmount or message change
    }
  }, [message, setErrorMessage]);

  if (!message) return null;

  return (
    <div
      className={`text-red-600 text-sm font-medium bg-red-100 border border-red-300 px-3 py-2 rounded-md transition-opacity duration-300 ${className}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
