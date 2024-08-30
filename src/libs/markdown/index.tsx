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
    return <h1 className="inline-block text-2xl font-medium" {...props} />
  },
  h2: function Header2(props: JSX.IntrinsicElements["h2"]) {
    return <h2 className="inline-block text-xl font-medium" {...props} />
  },
  h3: function Header3(props: JSX.IntrinsicElements["h3"]) {
    return <h3 className="inline-block text-lg font-medium" {...props} />
  },
  h4: function Header4(props: JSX.IntrinsicElements["h4"]) {
    return <h4 className="inline-block text-base font-medium" {...props} />
  },
  a: function Anchor(props: JSX.IntrinsicElements["a"]) {
    return <a className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props} />
  },
  ul: function UnorderedList(props: JSX.IntrinsicElements["ul"]) {
    const { children } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ul className="inline-block list-disc" {...props}>
      {filtered}
    </ul>
  },
  ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
    const { children } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ol className="inline-block list-decimal" {...props}>
      {filtered}
    </ol>
  },
  li: function ListItem(props: JSX.IntrinsicElements["li"]) {
    const { children } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <li className="ml-4" {...props}>
      {filtered}
    </li>
  },
  p: function Paragraph(props: JSX.IntrinsicElements["p"]) {
    return <>{props.children}</>
  },
  pre: function Pre(props: JSX.IntrinsicElements["pre"]) {
    return <pre className="inline-block my-2 p-4 bg-contrast rounded-xl" {...props} />
  },
  code: function Code(props: JSX.IntrinsicElements["code"]) {
    return <code {...props} />
  }
}