
import React from 'react';

export const DatabaseZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 12 22A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 12 15A9 3 0 0 0 21 12" />
    <path d="M11 10.5V8l-3 4h4l-3 4v-2.5" />
  </svg>
);
