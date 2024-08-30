import { ButtonProps } from "@/libs/react/props/html"
import { ButtonShrinkerDiv, MenuButtonShrinkerDiv } from "../shrinkers"

export function ShrinkableOppositeButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap enabled:hover:bg-opposite-hover focus-visible:outline-opposite disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function WideShrinkableOppositeButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="flex-1 group po-md bg-opposite text-opposite rounded-xl outline-none whitespace-nowrap enabled:hover:bg-opposite-hover focus-visible:outline-opposite disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function ShrinkableContrastButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md bg-contrast rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast-hover focus-visible:outline-contrast disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function WideShrinkableContrastButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="flex-1 group po-md bg-contrast rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast-hover focus-visible:outline-contrast disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}


export function ShrinkableNakedButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="group po-md rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast focus-visible:bg-contrast disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}

export function WideShrinkableNakedMenuButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="flex-1 group po-md rounded-xl outline-none whitespace-nowrap enabled:hover:bg-contrast focus-visible:bg-contrast disabled:opacity-50 transition-opacity"
    {...rest}>
    <MenuButtonShrinkerDiv>
      {children}
    </MenuButtonShrinkerDiv>
  </button>
}

export function RoundedShrinkableNakedButton(props: ButtonProps) {
  const { children, ...rest } = props

  return <button className="p-1 group rounded-full outline-none whitespace-nowrap enabled:hover:bg-contrast focus-visible:bg-contrast disabled:opacity-50 transition-opacity"
    {...rest}>
    <ButtonShrinkerDiv>
      {children}
    </ButtonShrinkerDiv>
  </button>
}