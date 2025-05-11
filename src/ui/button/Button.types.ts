export type ButtonProps = {
  /* Внешний вид кнопки */
  color?: 'Primary' | 'Secondary';
  /* Недоступное состояние кнопки  */
  disabled?: boolean;
  /* Текст кнопки */
  text: string;
  /* Текст кнопки */
  type?: 'submit' | 'button';
  /* Событие нажатия */
  onClick?: () => void;
};
