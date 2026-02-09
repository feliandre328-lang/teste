
import React from 'react';

export const LandmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <line x1="12" x2="12" y1="22" y2="18" />
    <path d="M9 18h6" />
    <path d="M3.5 12.5 12 6l8.5 6.5" />
    <path d="M3 20.5 12 14l9 6.5" />
    <path d="M2 12h20" />
  </svg>
);
