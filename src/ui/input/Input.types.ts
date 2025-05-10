import { InputHTMLAttributes } from 'react';

type InputType = 'text' | 'password' | 'email';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: InputType;
  label?: string;
  error?: string | null;
  className?: string;
};

export type { InputType, InputProps };
