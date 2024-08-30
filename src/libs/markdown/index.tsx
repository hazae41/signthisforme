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
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <h1 className="inline-block align-top text-2xl font-medium"
      {...rest}>
      {filtered}
    </h1>
  },
  h2: function Header2(props: JSX.IntrinsicElements["h2"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <h2 className="inline-block align-top text-xl font-medium"
      {...rest}>
      {filtered}
    </h2>
  },
  h3: function Header3(props: JSX.IntrinsicElements["h3"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <h3 className="inline-block align-top text-lg font-medium"
      {...rest}>
      {filtered}
    </h3>
  },
  h4: function Header4(props: JSX.IntrinsicElements["h4"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <h4 className="inline-block align-top text-base font-medium"
      {...rest}>
      {filtered}
    </h4>
  },
  a: function Anchor(props: JSX.IntrinsicElements["a"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <a className="inline-block align-top text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...rest}>
      {filtered}
    </a>
  },
  ul: function UnorderedList(props: JSX.IntrinsicElements["ul"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ul className="inline-block align-top list-disc"
      {...rest}>
      {filtered}
    </ul>
  },
  ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <ol className="inline-block align-top list-decimal"
      {...rest}>
      {filtered}
    </ol>
  },
  li: function ListItem(props: JSX.IntrinsicElements["li"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    if (className === "task-list-item")
      return <li className="flex items-center gap-2"
        {...rest}>
        {filtered}
      </li>

    return <li className="ml-5"
      {...rest}>
      {filtered}
    </li>
  },
  p: function Paragraph(props: JSX.IntrinsicElements["p"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <p className="inline-block align-top"
      {...rest}>
      {filtered}
    </p>
  },
  pre: function Pre(props: JSX.IntrinsicElements["pre"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <pre className="inline-block align-top my-2 p-4 bg-contrast rounded-xl"
      {...rest}>
      {filtered}
    </pre>
  },
  code: function Code(props: JSX.IntrinsicElements["code"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <code className="inline-block align-top"
      {...rest}>
      {filtered}
    </code>
  },
  blockquote: function Blockquote(props: JSX.IntrinsicElements["blockquote"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <blockquote className="inline-block align-top my-2 p-4 bg-contrast rounded-xl"
      {...rest}>
      {filtered}
    </blockquote>
  },
  table: function Table(props: JSX.IntrinsicElements["table"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <table className="inline-block align-top my-2 border-collapse"
      {...rest}>
      {filtered}
    </table>
  },
  thead: function TableHead(props: JSX.IntrinsicElements["thead"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <thead className=""
      {...rest}>
      {filtered}
    </thead>
  },
  tbody: function TableBody(props: JSX.IntrinsicElements["tbody"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <tbody className=""
      {...rest}>
      {filtered}
    </tbody>
  },
  tr: function TableRow(props: JSX.IntrinsicElements["tr"]) {
    const { children, className, ...rest } = props

    const filtered = Array.isArray(children)
      ? children.reduce((a, _, i) => (children[i] === "\n" && children[i - 1] !== "") ? a : [...a, children[i]], [])
      : children

    return <tr className=""
      {...rest}>
      {filtered}
    </tr>
  },
  th: function TableHeader(props: JSX.IntrinsicElements["th"]) {
    const { children, className, ...rest } = props

    return <th className="po-md border border-contrast"
      {...rest}>
      {children}
    </th>
  },
  td: function TableCell(props: JSX.IntrinsicElements["td"]) {
    const { children, className, ...rest } = props

    return <td className="po-md border border-contrast"
      {...rest}>
      {children}
    </td>
  },
  hr: function HorizontalRule(props: JSX.IntrinsicElements["hr"]) {
    return <div className="inline-block align-top w-full mt-2 border-t border-contrast" />
  }
}