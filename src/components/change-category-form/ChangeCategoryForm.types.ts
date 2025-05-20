import { type Dayjs } from 'dayjs';

type ChangeCategoryFormProps = {
  amount?: number;
  closeFN: () => void;
  date?: Dayjs;
  desc?: string;
  id: string;
  name?: string;
  photo?: string;
};

export type { ChangeCategoryFormProps };
