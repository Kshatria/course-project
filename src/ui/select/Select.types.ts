import { type UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  id: string;
  name: string;
};

type SelectProps = {
  options: Option[];
  label: string;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
  onChange: (id: string) => void;
};

export type { SelectProps, Option };
