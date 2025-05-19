import { type ReactNode } from 'react'

type ModalProps = {
  /** Содержание всплывающего окна */
  children: ReactNode
  /** Функция обработки закрытия всплывающего окна */
  onClose: () => void
  /** Признак видимости всплывающего окна */
  visible: boolean
}

export type { ModalProps }
