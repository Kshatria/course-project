import { useCallback, useMemo, useState } from 'react'

/**
 * Добавляет компоненту функциональность по управлению отображением модального контента (попапы, дропдауны и т.п.).
 * @param defaultVisible - начальное состояние видимости модального контента
 * @returns - { visible, show, hide, toggle }
 *
 *  - visible - текущее состояние видимости контента
 *  - show - переключает контент в видимое состояние
 *  - hide - переключает контент в скрытое состояние
 *  - toggle - переключает видимость контента в противоположное состояние
 */
const useModal = (defaultVisible = false) => {
  const [visible, setVisible] = useState(defaultVisible)

  const show = useCallback(() => setVisible(true), [])

  const hide = useCallback(() => setVisible(false), [])

  const toggle = useCallback(() => setVisible((prevValue) => !prevValue), [])

  return useMemo(
    () => ({
      show,
      hide,
      toggle,
      visible,
    }),
    [hide, show, toggle, visible]
  )
}

export { useModal }
