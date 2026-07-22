import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 font-medium transition-transform duration-200 active:scale-[.97]',
        variant === 'primary'
          ? 'bg-accent text-white shadow-soft hover:-translate-y-0.5'
          : 'border border-border text-ink hover:bg-ink/5',
        className,
      )}
      {...props}
    />
  );
}
