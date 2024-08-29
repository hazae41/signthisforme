import { ChildrenProps } from "@/libs/react/props/children"
import { AnchorProps } from "@/libs/react/props/html"
import { AnchorShrinkerDiv } from "../shrinkers"

export function ShrinkableOppositeAnchor(props: ChildrenProps & AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, "aria-disabled": disabled = false, ...rest } = props

  return <a className="group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-opposite-hover focus-visible:outline-opposite aria-disabled:opacity-50 transition-opacity"
    aria-disabled={disabled}
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </a>
}

export function WideShrinkableOppositeAnchor(props: ChildrenProps & AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, "aria-disabled": disabled = false, ...rest } = props

  return <a className="flex-1 group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-opposite-hover focus-visible:outline-opposite aria-disabled:opacity-50 transition-opacity"
    aria-disabled={disabled}
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </a>
}

export function WideShrinkableContrastAnchor(props: ChildrenProps & AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, "aria-disabled": disabled = false, ...rest } = props

  return <a className="flex-1 group po-md bg-contrast rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-contrast-hover focus-visible:outline-contrast aria-disabled:opacity-50 transition-opacity"
    aria-disabled={disabled}
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </a>
}

export function WideShrinkableNakedAnchor(props: ChildrenProps & AnchorProps & { "aria-disabled"?: boolean }) {
  const { children, "aria-disabled": disabled = false, ...rest } = props

  return <a className="flex-1 group po-md rounded-xl outline-none whitespace-nowrap aria-[disabled=false]:hover:bg-contrast focus-visible:bg-contrast aria-disabled:opacity-50 transition-opacity"
    aria-disabled={disabled}
    {...rest}>
    <AnchorShrinkerDiv>
      {children}
    </AnchorShrinkerDiv>
  </a>
}