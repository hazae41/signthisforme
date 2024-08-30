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
      .process(text.replaceAll("\n", "\n&nbsp;  \n"))

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
    return <h1 className="text-2xl font-medium mt-1 mb-2" {...props} />
  },
  h2: function Header2(props: JSX.IntrinsicElements["h2"]) {
    return <h2 className="text-xl font-medium mt-1 mb-2" {...props} />
  },
  h3: function Header3(props: JSX.IntrinsicElements["h3"]) {
    return <h3 className="text-lg font-medium mt-1 mb-2" {...props} />
  },
  h4: function Header4(props: JSX.IntrinsicElements["h4"]) {
    return <h4 className="text-base font-medium mt-1 mb-2" {...props} />
  },
  a: function Anchor(props: JSX.IntrinsicElements["a"]) {
    return <a className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props} />
  },
  ul: function UnorderedList(props: JSX.IntrinsicElements["ul"]) {
    return <ul className="list-disc" {...props} />
  },
  ol: function OrderedList(props: JSX.IntrinsicElements["ol"]) {
    return <ol className="list-decimal" {...props} />
  },
  li: function ListItem(props: JSX.IntrinsicElements["li"]) {
    return <li className="ml-4" {...props} />
  }
}