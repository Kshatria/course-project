import type { Operation } from '@/types/Operation';

type InformerDetailProps = Operation & {
  /* Недоступно редактирование  */
  disabled?: boolean;
  /* Событие редактирования операции */
  onClick: () => void;
};

export type { InformerDetailProps };
