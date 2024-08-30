import { AnchorProps } from "@/libs/react/props/html"
import { AnchorShrinkerDiv } from "../shrinkers"

export function Anchor(props: AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, href, onClick, onKeyDown, onContextMenu, "aria-disabled": disabled = false, ...rest } = props

  return <a
    href={disabled ? undefined : href}
    onClick={disabled ? undefined : onClick}
    onKeyDown={disabled ? undefined : onKeyDown}
    onContextMenu={disabled ? undefined : onContextMenu}
    aria-disabled={disabled}
    {...rest}>
    {children}
  </a>
}

export function ShrinkableOppositeAnchor(props: AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, ...rest } = props

  return <Anchor className="group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-opposite-hover focus-visible:outline-opposite aria-disabled:opacity-50 transition-opacity"
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </Anchor>
}

export function WideShrinkableOppositeAnchor(props: AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, ...rest } = props

  return <Anchor className="flex-1 group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-opposite-hover focus-visible:outline-opposite aria-disabled:opacity-50 transition-opacity"
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </Anchor>
}

export function WideShrinkableContrastAnchor(props: AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, ...rest } = props

  return <Anchor className="flex-1 group po-md bg-contrast rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-contrast-hover focus-visible:outline-contrast aria-disabled:opacity-50 transition-opacity"
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </Anchor>
}

export function WideShrinkableNakedAnchor(props: AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, ...rest } = props

  return <Anchor className="flex-1 group po-md rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-contrast focus-visible:bg-contrast aria-disabled:opacity-50 transition-opacity"
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </Anchor>
}