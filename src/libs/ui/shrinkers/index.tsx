import { ChildrenProps } from "@/libs/react/props/children"

export function ButtonGapperDiv(props: ChildrenProps) {
  const { children } = props

  return <div className="h-full w-full flex justify-center items-center gap-2">
    {children}
  </div>
}

export function ButtonShrinkerDiv(props: ChildrenProps) {
  const { children } = props

  return <div className="h-full w-full flex justify-center items-center gap-2 group-enabled:group-active:scale-90 transition-transform">
    {children}
  </div>
}

export function AnchorShrinkerDiv(props: ChildrenProps) {
  const { children } = props

  return <div className="h-full w-full flex justify-center items-center gap-2 group-[[aria-disabled=false]]:group-active:scale-90 transition-transform">
    {children}
  </div>
}

export function MenuButtonShrinkerDiv(props: ChildrenProps) {
  const { children } = props

  return <div className="h-full w-full flex justify-start items-center gap-4 group-enabled:group-active:scale-90 transition-transform">
    {children}
  </div>
}