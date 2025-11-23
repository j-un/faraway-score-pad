import React from 'react';

const IconWrapper = ({
  children,
  size = 24,
  className = '',
}: {
  children: React.ReactNode;
  size?: number | undefined;
  className?: string | undefined;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const Plus = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </IconWrapper>
);

export const Trash2 = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </IconWrapper>
);

export const Trophy = ({
  size,
  className,
  fill,
}: {
  size?: number;
  className?: string;
  fill?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill || 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M8 22l-1-4h10l-1 4" />
    <path d="M9.5 9.5c-1.5 2.5-1.5 7-1.5 9h8c0-2 0-6.5-1.5-9" />
    <path d="M12 3v11" />
  </svg>
);

export const RotateCcw = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </IconWrapper>
);

export const Users = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);

export const Calculator = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="M16 10h.01" />
    <path d="M12 10h.01" />
    <path d="M8 10h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
    <path d="M12 18h.01" />
    <path d="M8 18h.01" />
  </IconWrapper>
);

export const X = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <IconWrapper size={size} className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);
