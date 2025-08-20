// app/error.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function InternalServerError() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (isOffline) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">No Internet</h1>
          <p className="mt-4 text-xl text-gray-700">You&apos;re offline</p>
          <p className="mt-2 text-gray-500">Please check your internet connection.</p>
        </div>
      </div>
    );
  }

  return null; // Don't show anything when online
}