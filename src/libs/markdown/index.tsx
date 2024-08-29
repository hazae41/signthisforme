import { useCallback, useEffect, useState } from "react"
import * as jsx from "react/jsx-runtime"
import rehypeReact from "rehype-react"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

export function Markdown(props: { readonly text: string }) {
  const { text } = props

  const [element, setElement] = useState<JSX.Element>()

  const parseOrThrow = useCallback(async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeReact, { ...jsx, components } as any)
      .process(text.replaceAll("\n", "\n\n"))

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
    return <h1 className="text-2xl font-medium" {...props} />
  },
  h2: function Header2(props: JSX.IntrinsicElements["h2"]) {
    return <h2 className="text-xl font-medium" {...props} />
  },
  h3: function Header3(props: JSX.IntrinsicElements["h3"]) {
    return <h3 className="text-lg font-medium" {...props} />
  },
  h4: function Header4(props: JSX.IntrinsicElements["h4"]) {
    return <h4 className="text-base font-medium" {...props} />
  },
  a: function Anchor(props: JSX.IntrinsicElements["a"]) {
    return <a className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props} />
  }
}