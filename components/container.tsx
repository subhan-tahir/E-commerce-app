import React from 'react'
interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const container = ({children,className}:ContainerProps) => {
  return (
    <div className={`container-fluid mx-auto px-4 ${className}`}>
        {children}
    </div>
  )
}

export default container