import { createPortal } from 'react-dom';
import type { ModalProps } from './Modal.types'
import styles from './Modal.module.css'

const Modal = ({ children, onClose, visible }: ModalProps) => {
  if (!visible) return null

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export { Modal, type ModalProps }
