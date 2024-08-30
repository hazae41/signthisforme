import { useCallback, useEffect, useState } from "react"
import * as jsx from "react/jsx-runtime"
import rehypeReact from "rehype-react"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { remarkNewlines } from "./newlines"

export function Markdown(props: { readonly text: string }) {
  const { text } = props

  const [element, setElement] = useState<JSX.Element>()

  const parseOrThrow = useCallback(async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkNewlines)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeReact, { ...jsx, components } as any)
      .process(text)

    setElement(file.result)
  }, [text])

  useEffect(() => {
    parseOrThrow()
  }, [parseOrThrow])

  if (element == null)
    return null

  return element
}

export const components = {
  h1: function Header1(props: JSX.IntrinsicElements["h1"]) {
    const { children, ...rest } = props

    return <h1 className="inline-block align-top text-2xl font-medium"
      {...rest}>
      {children}
    </h1>
  },
  h2: function Header2(props: JSX.IntrinsicElements["h2"]) {
    const { children, ...rest } = props

    return <h2 className="inline-block align-top text-xl font-medium"
      {...rest}>
      {children}
    </h2>
  },
  h3: function Header3(props: JSX.IntrinsicElements["h3"]) {
    const { children, ...rest } = props

    return <h3 className="inline-block align-top text-lg font-medium"
      {...rest}>
      {children}
    </h3>
  },
  h4: function Header4(props: JSX.IntrinsicElements["h4"]) {
    const { children, ...rest } = props

    return <h4 className="inline-block align-top text-base font-medium"
      {...rest}>
      {children}
    </h4>
  },
  a: function Anchor(props: JSX.IntrinsicElements["a"]) {
    const { children, ...rest } = props

    return <a className="inline-block align-top text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...rest}>
      {children}
    </a>
  },
  ul: function UnorderedList(props: JSX.IntrinsicElements["ul"]) {
    const { children, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ul className="inline-block align-top list-disc"
      {...rest}>
      {filtered}
    </ul>
  },
  ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
    const { children, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ol className="inline-block align-top list-decimal"
      {...rest}>
      {filtered}
    </ol>
  },
  li: function ListItem(props: JSX.IntrinsicElements["li"]) {
    const { children, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <li className="ml-5"
      {...rest}>
      {filtered}
    </li>
  },
  p: function Paragraph(props: JSX.IntrinsicElements["p"]) {
    const { children } = props

    return <p className="inline-block align-top">
      {children}
    </p>
  },
  pre: function Pre(props: JSX.IntrinsicElements["pre"]) {
    const { children, ...rest } = props

    return <pre className="inline-block align-top my-2 p-4 bg-contrast rounded-xl"
      {...rest}>
      {children}
    </pre>
  },
  code: function Code(props: JSX.IntrinsicElements["code"]) {
    const { children, ...rest } = props

    return <code className="inline-block align-top"
      {...rest}>
      {children}
    </code>
  }
}