import React from 'react';

export default function TwitterLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width="32"
      height="32"
    >
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53..."></path>
    </svg>
  );
}
