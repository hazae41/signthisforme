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

  return <div className="h-full w-full flex justify-center items-center gap-2 group-active:scale-90 transition-transform">
    {children}
  </div>
}