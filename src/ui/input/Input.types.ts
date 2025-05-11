import { type InputHTMLAttributes } from 'react';

type InputType = 'email' | 'password' | 'text';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: null | string;
  label?: string;
  type?: InputType;
};

export type { InputProps, InputType };
