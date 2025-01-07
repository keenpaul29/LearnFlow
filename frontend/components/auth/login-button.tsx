'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

interface LoginButtonProps {
  children?: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = 'redirect',
  asChild
}: LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    signIn('google', {
      callbackUrl: '/dashboard'
    });
  };

  return (
    <Button
      onClick={onClick}
      className="w-full flex items-center gap-2"
      variant="outline"
      size="lg"
    >
      <FcGoogle className="h-5 w-5" />
      {children || "Continue with Google"}
    </Button>
  );
}
