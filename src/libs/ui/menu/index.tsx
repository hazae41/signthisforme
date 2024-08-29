import { stopPropagation } from "@/libs/react/events"
import { ChildrenProps } from "@/libs/react/props/children"
import { DarkProps } from "@/libs/react/props/dark"
import { Portal } from "@/libs/ui/portal"
import { usePathContext } from "@hazae41/chemin"
import { Nullable } from "@hazae41/option"
import { CloseContext, useCloseContext } from "@hazae41/react-close-context"
import { KeyboardEvent, MouseEvent, SyntheticEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"

export function Menu(props: ChildrenProps & DarkProps) {
  const { url } = usePathContext().getOrThrow()
  const close = useCloseContext().getOrThrow()
  const { dark, children } = props

  const maybeX = url.searchParams.get("x")
  const maybeY = url.searchParams.get("y")

  const previous = useRef(document.activeElement)

  /**
   * Restore focus on unmount
   */
  useEffect(() => () => {
    if (previous.current == null)
      return
    if (!(previous.current instanceof HTMLElement))
      return
    previous.current.focus()
  }, [])

  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)

  /**
   * Forcefully open HTML dialog on mount
   */
  useLayoutEffect(() => {
    if (!document.body.contains(dialog))
      return
    dialog?.showModal()
  }, [dialog])

  const [premount, setPremount] = useState(true)
  const [postmount, setPostmount] = useState(false)

  /**
   * Smoothly close the dialog
   */
  const hide = useCallback((force?: boolean) => {
    if (force) {
      close()
      return
    }

    setPremount(false)
  }, [close])

  /**
   * Smoothly close the dialog on escape
   */
  const onEscape = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Escape")
      return

    e.preventDefault()

    hide()
  }, [hide])

  /**
   * Smoothly close the dialog on outside click
   */
  const onClickOutside = useCallback((e: MouseEvent) => {
    if (e.clientX > e.currentTarget.clientWidth)
      return

    e.preventDefault()

    hide()
  }, [hide])

  /**
   * When the dialog could not be closed smoothly
   * @example Safari on escape
   */
  const onClose = useCallback((e: SyntheticEvent) => {
    close()
  }, [close])

  /**
   * Sync mounted state with visible state on animation end
   */
  const onAnimationEnd = useCallback(() => {
    flushSync(() => setPostmount(premount))
  }, [premount])

  /**
   * Unmount this component from parent when both visible and mounted are false
   */
  useEffect(() => {
    if (premount)
      return
    if (postmount)
      return
    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [premount, postmount])

  const [menu, setMenu] = useState<Nullable<HTMLElement>>(null)

  const [maybeW, setMaybeW] = useState(0)
  const [maybeH, setMaybeH] = useState(0)

  const [maybeL, setMaybeL] = useState(0)
  const [maybeT, setMaybeT] = useState(0)

  useLayoutEffect(() => {
    if (menu == null)
      return

    setMaybeW(menu.offsetWidth)
    setMaybeH(menu.offsetHeight)

    if (maybeX == null)
      return
    if (maybeY == null)
      return

    const x = Number(maybeX)
    const y = Number(maybeY)

    setMaybeL(((x + menu.offsetWidth) > window.innerWidth) ? Math.max(x - menu.offsetWidth, 0) : x)
    setMaybeT(((y + menu.offsetHeight) > window.innerHeight) ? Math.max(y - menu.offsetHeight, 0) : y)
  }, [maybeX, maybeY, menu])

  /**
   * Only unmount when transition is finished
   */
  if (!premount && !postmount)
    return null

  return <Portal>
    <CloseContext.Provider value={hide}>
      <dialog className=""
        style={{ "--x": `${maybeX}px`, "--y": `${maybeY}px`, "--w": `${maybeW}px`, "--h": `${maybeH}px`, "--l": `${maybeL}px`, "--t": `${maybeT}px` } as any}
        onKeyDown={onEscape}
        onClose={onClose}
        ref={setDialog}>
        <div className={`fixed inset-0 ${dark ? "dark" : ""}`}
          onMouseDown={onClickOutside}
          onClick={stopPropagation}>
          <div className={`absolute flex flex-col min-w-[min(calc(100vw-var(--l)),8rem)] max-w-[min(calc(100vw-var(--l)),32rem)] [translate:var(--l)_var(--t)] text-default bg-default border border-contrast rounded-2xl p-1 ${premount ? "animate-scale-xywh-in" : "animate-scale-xywh-out"}`}
            ref={setMenu}
            aria-modal
            onAnimationEnd={onAnimationEnd}
            onMouseDown={stopPropagation}>
            <div className="p-1 grow flex flex-col max-h-[200px] overflow-y-auto scrollbar-default">
              {children}
            </div>
          </div>
        </div>
      </dialog>
    </CloseContext.Provider>
  </Portal>
}