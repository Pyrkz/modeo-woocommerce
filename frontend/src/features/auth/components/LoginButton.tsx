'use client';

import { useAuth } from '../hooks/useAuth';

interface LoginButtonProps {
  children?: React.ReactNode;
  className?: string;
  returnUrl?: string;
}

export function LoginButton({ 
  children = 'Zaloguj się', 
  className = '', 
  returnUrl 
}: LoginButtonProps) {
  const { login } = useAuth();

  return (
    <button
      onClick={() => login(returnUrl)}
      className={className}
    >
      {children}
    </button>
  );
}