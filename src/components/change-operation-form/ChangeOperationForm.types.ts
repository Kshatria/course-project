import { type Dayjs } from 'dayjs';
import { type ChangeCategoryFormProps } from '@/components/change-category-form';

type ChangeOperationFormProps = {
  amount?: number,
  category: ChangeCategoryFormProps
  closeFN: () => void,
  date?: Dayjs,
  desc?: string,
  id: string,
  name?: string,
}

export type { ChangeOperationFormProps };
