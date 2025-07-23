import React from 'react';

export default function LoadingScreen({ size = 64, shape = 'rounded-full' }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <img
        src="/favicon3.ico"
        alt="Loading..."
        className={`animate-rotate-once ${shape}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
}
