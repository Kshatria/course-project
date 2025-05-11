export type ButtonProps = {
  /* Внешний вид кнопки */
  color?: 'Primary' | 'Secondary';
  /* Недоступное состояние кнопки  */
  disabled?: boolean;
  /* Событие нажатия */
  onClick?: () => void;
  /* Текст кнопки */
  text: string;
  /* Текст кнопки */
  type?: 'button' | 'submit';
};
