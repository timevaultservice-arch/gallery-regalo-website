import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/format';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn('field', className)} {...props} />;
});
Input.displayName = 'Input';
