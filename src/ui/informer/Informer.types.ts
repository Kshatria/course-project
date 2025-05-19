import type { Category } from '@/types/Operation';

export type InformerProps = {
  /* id операции  */
  id: string;
  /* Название категории  */
  category?: Category;
  /* Описание  */
  desc?: string;
  /* Название */
  name: string;
  /* Сумма операции  */
  amount?: number;
  /* id команды  */
  commandId?: string;
  /* Дата создания  */
  createdAt?: string;
  /* Фото  */
  photo?: string;
  /* Дата редактирования  */
  updatedAt?: string;
};
