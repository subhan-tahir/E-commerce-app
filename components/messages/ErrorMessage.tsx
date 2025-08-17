import React, { Dispatch, SetStateAction, useEffect } from 'react';

// interface ErrorMessageProps {
//   message: string;
//   className?: string;
//   setErrorMessage: Dispatch<SetStateAction<string>>
// }

// const ErrorMessage: React.FC<ErrorMessageProps> = ({
//   message,
//   className = '',
//   setErrorMessage,
// }) => {
//   useEffect(() => {
//     if (message) {
//       const timeout = setTimeout(() => {
//         setErrorMessage('');
//       }, 5000);

//       return () => clearTimeout(timeout); // cleanup on unmount or message change
//     }
//   }, [message, setErrorMessage]);

//   if (!message) return null;

//   return (
//     <div
//       className={`text-red-600 text-sm font-medium bg-red-100 border border-red-300 px-3 py-2 rounded-md transition-opacity duration-300 ${className}`}
//     >
//       {message}
//     </div>
//   );
// };

// export default ErrorMessage;
interface ErrorMessageProps {
  message: string;
  className?: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  email?: string; // optional to build verify link
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
  setErrorMessage,
  email,
}) => {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [message, setErrorMessage]);

  if (!message) return null;

  const isUnverified = message.includes('User not verified');

  return (
    <div className={`text-red-600 text-sm font-medium bg-red-100 border border-red-300 px-3 py-2 rounded-md ${className}`}>
      {isUnverified ? (
        <>
          <p>Your account is not verified.</p>
          {email && (
            <a
              href={`/auth/verify-email?email=${encodeURIComponent(email)}`}
              className="text-blue-600 underline font-semibold"
            >
              Verify Email Now
            </a>
          )}
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
