import { stopPropagation } from "@/libs/react/events"
import { ChildrenProps } from "@/libs/react/props/children"
import { createPortal } from "react-dom"

export function Portal(props: ChildrenProps) {
  const { children } = props

  const element = <Keeper>{children}</Keeper>
  const container = document.getElementById("__next")!

  return <>{createPortal(element, container)}</>
}

export function Keeper(props: ChildrenProps) {
  const { children } = props

  return <div
    onClick={stopPropagation}
    onContextMenu={stopPropagation}
    onDoubleClick={stopPropagation}

    onDrag={stopPropagation}
    onDragEnd={stopPropagation}
    onDragEnter={stopPropagation}
    onDragExit={stopPropagation}
    onDragLeave={stopPropagation}
    onDragOver={stopPropagation}
    onDragStart={stopPropagation}
    onDrop={stopPropagation}

    onMouseDown={stopPropagation}
    onMouseEnter={stopPropagation}
    onMouseLeave={stopPropagation}
    onMouseMove={stopPropagation}
    onMouseOver={stopPropagation}
    onMouseOut={stopPropagation}
    onMouseUp={stopPropagation}

    onKeyDown={stopPropagation}
    onKeyUp={stopPropagation}

    onFocus={stopPropagation}
    onBlur={stopPropagation}

    onChange={stopPropagation}
    onInput={stopPropagation}

    onInvalid={stopPropagation}
    onSubmit={stopPropagation}>
    {children}
  </div>
}