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
    return <ul className="inline-block whitespace-normal list-disc" {...props} />
  },
  ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
    return <ol className="inline-block whitespace-normal list-decimal" {...props} />
  },
  li: function ListItem(props: JSX.IntrinsicElements["li"]) {
    return <li className="whitespace-pre-wrap ml-4" {...props} />
  },
  p: function Paragraph(props: JSX.IntrinsicElements["p"]) {
    return <p className="inline-block">{props.children}</p>
  },
  pre: function Pre(props: JSX.IntrinsicElements["pre"]) {
    return <pre className="inline-block my-2 p-4 bg-contrast rounded-xl" {...props} />
  },
  code: function Code(props: JSX.IntrinsicElements["code"]) {
    return <code {...props} />
  }
}