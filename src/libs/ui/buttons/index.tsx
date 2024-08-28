import { ChildrenProps } from "@/libs/react/props/children"
import { ButtonProps } from "@/libs/react/props/html"
import { ButtonShrinkerDiv } from "../shrinkers"

export function ShrinkableOppositeButton(props: ChildrenProps & ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap enabled:hover:bg-opposite-hover focus-visible:outline-opposite disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function ShrinkableContrastButton(props: ChildrenProps & ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md bg-contrast rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast-hover focus-visible:outline-contrast disabled:opacity-50 transition-opacity" {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function ShrinkableNakedButton(props: ChildrenProps & ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast focus-visible:bg-contrast disabled:opacity-50 transition-opacity" {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}