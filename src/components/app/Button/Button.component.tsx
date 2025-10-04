import * as React from 'react';

import { Loader } from 'lucide-react';

import { Button as MainButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentProps<typeof MainButton> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, disabled, children, className, ...props }, ref) => (
    <MainButton
      ref={ref}
      disabled={isLoading || disabled}
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      {isLoading && (
        <Loader className="size-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </MainButton>
  ),
);

Button.displayName = 'Button';
