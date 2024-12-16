import * as React from 'react';

import { Input } from './input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('ps-3 pe-9', className)}
        ref={ref}
        suffix={
          showPassword ? (
            <EyeIcon
              className="select-none"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              className="select-none"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
