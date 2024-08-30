import { Errors } from "@/libs/errors"
import { Outline } from "@/libs/heroicons"
import { Markdown } from "@/libs/markdown"
import { ShrinkableOppositeAnchor, WideShrinkableContrastAnchor, WideShrinkableNakedAnchor } from "@/libs/ui/anchors"
import { ShrinkableOppositeButton } from "@/libs/ui/buttons"
import { MediumLoading } from "@/libs/ui/loading"
import { urlOf } from "@/libs/url"
import { Deferred, Stack } from "@hazae41/box"
import { useCoords, usePathContext, useSearchState, useSearchSubpath } from "@hazae41/chemin"
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { BrowserProvider, ethers } from "ethers"
import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react"

export function Router() {
  const path = usePathContext().getOrThrow()

  if (path.url.pathname === "/make")
    return <Make />

  if (path.url.pathname === "/sign")
    return <Sign />

  if (path.url.pathname === "/check")
    return <Check />

  if (path.url.pathname === "/done")
    return <Done />

  return <Landing />
}

export function Sign() {
  const path = usePathContext().getOrThrow()

  const modal = useWeb3Modal()
  const account = useWeb3ModalAccount()
  const provider = useWeb3ModalProvider()

  const [text] = useSearchState(path, "text")
  const [api] = useSearchState(path, "api")

  const [loading, setLoading] = useState(false)

  const onAgreeClick = useCallback(() => Errors.runAndLogAndAlert(async () => {
    if (!text)
      return

    if (provider.walletProvider == null) {
      await modal.open()
      return
    }

    const { address } = account

    if (address == null) {
      await modal.open()
      return
    }

    using stack = new Stack()

    setLoading(true)

    stack.push(new Deferred(() => setLoading(false)))

    const signer = await new BrowserProvider(provider.walletProvider).getSigner()
    const signature = await signer.signMessage(text)

    if (!api) {
      location.assign(path.go(urlOf("/check", { type: "ethereum", text, address, signature }).href))
      return
    }

    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ text, address, signature })

    const response = await fetch(api, { method, headers, body })

    if (!response.ok)
      throw new Error(await response.text())

    location.assign(path.go(urlOf("/done", { type: "ethereum", text, address, signature }).href))
  }), [path, modal, account, provider])

  if (!text)
    return null

  return <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
    <div className="h-16" />
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        You are signing this text
      </h1>
      <div className="h-4" />
      <div className="size-12 bg-black dark:bg-white border-2 border-solid" style={{
        mask: `url(/assets/arrow.png) no-repeat center / contain`,
        WebkitMask: `url(/assets/arrow.png) no-repeat center / contain`
      }} />
    </div>
    <div className="h-4" />
    <div className="p-4 bg-contrast rounded-xl h-[500px] flex flex-col">
      <div className="overflow-y-auto">
        <Markdown text={text || ""} />
      </div>
    </div>
    <div className="h-4" />
    <div className="flex items-center gap-2">
      <ShrinkableOppositeButton
        onClick={onAgreeClick}
        disabled={loading}>
        {loading && <MediumLoading />}
        {!loading && <Outline.CheckIcon className="size-4" />}
        I agree
      </ShrinkableOppositeButton>
    </div>
    <div className="h-16" />
  </div>
}

export function Done() {
  const path = usePathContext().getOrThrow()

  const [text] = useSearchState(path, "text")

  return <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
    <div className="h-16" />
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        You have signed this text
      </h1>
      <div className="h-4" />
      <div className="size-12 bg-black dark:bg-white border-2 border-solid" style={{
        mask: `url(/assets/arrow.png) no-repeat center / contain`,
        WebkitMask: `url(/assets/arrow.png) no-repeat center / contain`
      }} />
    </div>
    <div className="h-4" />
    <div className="p-4 bg-contrast rounded-xl h-[500px] flex flex-col">
      <div className="overflow-y-auto">
        <Markdown text={text || ""} />
      </div>
    </div>
    <div className="h-4" />
    <div className="text-center text-contrast">
      (You can now close this page)
    </div>
    <div className="h-16" />
  </div>
}

export function Check() {
  const path = usePathContext().getOrThrow()
  const share = useSearchSubpath(path, "share")

  const [text] = useSearchState(path, "text")
  const [address] = useSearchState(path, "address")
  const [signature] = useSearchState(path, "signature")

  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading")

  const verify = useCallback(() => {
    if (!text)
      return "invalid"
    if (!address)
      return "invalid"
    if (!signature)
      return "invalid"

    const recovered = ethers.verifyMessage(text, signature)

    if (recovered !== address)
      return "invalid"

    return "valid"
  }, [])

  useEffect(() => {
    queueMicrotask(() => setStatus(verify()))
  }, [])

  const shareCoords = useCoords(share, urlOf("/open", { url: location.href }))

  if (!text)
    return null
  if (!address)
    return null
  if (!signature)
    return null

  if (status === "loading")
    return <div className="grow flex items-center justify-center">
      <MediumLoading />
    </div>

  if (status === "invalid")
    return <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
      Something went wrong when verifying the signature
    </div>

  return <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
    <div className="h-16" />
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        This text has been signed
      </h1>
      <div className="h-4" />
      <div className="size-12 bg-black dark:bg-white border-2 border-solid" style={{
        mask: `url(/assets/arrow.png) no-repeat center / contain`,
        WebkitMask: `url(/assets/arrow.png) no-repeat center / contain`
      }} />
    </div>
    <div className="h-4" />
    <div className="p-4 bg-contrast rounded-xl h-[500px] flex flex-col">
      <div className="overflow-y-auto">
        <Markdown text={text || ""} />
      </div>
    </div>
    <div className="h-4" />
    <div className="">
      By the Ethereum address
    </div>
    <div className="h-4" />
    <div className="po-md bg-contrast rounded-xl">
      <input className="w-full bg-transparent outline-none"
        value={address}
        readOnly />
    </div>
    <div className="h-4" />
    <div className="">
      With the signature
    </div>
    <div className="h-4" />
    <div className="po-md bg-contrast rounded-xl">
      <input className="w-full bg-transparent outline-none"
        value={signature}
        readOnly />
    </div>
    <div className="h-4" />
    <div className="flex items-center gap-2">
      <ShrinkableOppositeAnchor
        onKeyDown={shareCoords.onKeyDown}
        onClick={shareCoords.onClick}
        href={shareCoords.href}>
        <Outline.ShareIcon className="size-4" />
        Share
      </ShrinkableOppositeAnchor>
    </div>
    <div className="h-16" />
  </div>
}

export function Make() {
  const path = usePathContext().getOrThrow()
  const share = useSearchSubpath(path, "share")
  const [preview] = useSearchState(path, "preview")

  const [text, setText] = useSearchState(path, "text")

  const [rawText, setRawText] = useState(text)

  const defText = useDeferredValue(rawText)

  useEffect(() => {
    setText(defText)
  }, [defText])

  useEffect(() => {
    setRawText(text)
  }, [text])

  const onRawTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setRawText(e.target.value)
  }, [])

  const [api, setApi] = useSearchState(path, "api")

  const [rawApi, setRawApi] = useState(api)

  const defApi = useDeferredValue(rawApi)

  useEffect(() => {
    setApi(defApi)
  }, [defApi])

  useEffect(() => {
    setRawApi(api)
  }, [api])

  const onRawApiChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRawApi(e.target.value)
  }, [])

  const url = useMemo(() => {
    return path.go(urlOf("/sign", { type: "ethereum", text, api }))
  }, [path, text, api])

  const shareCoords = useCoords(share, urlOf("/open", { url: url.href }))

  return <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
    <div className="h-16" />
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        Enter some text to sign
      </h1>
      <div className="text-xl text-contrast font-medium">
        Yes, you can include links
      </div>
      <div className="h-4" />
      <div className="size-12 bg-black dark:bg-white border-2 border-solid" style={{
        mask: `url(/assets/arrow.png) no-repeat center / contain`,
        WebkitMask: `url(/assets/arrow.png) no-repeat center / contain`
      }} />
    </div>
    <div className="h-4" />
    <div className="p-4 bg-contrast rounded-xl h-[500px] flex flex-col">
      {preview !== "true" &&
        <textarea className="w-full bg-transparent outline-none resize-none"
          placeholder="I will buy crypto when my favorite influencer tells me to"
          onChange={onRawTextChange}
          value={rawText || ""}
          rows={100} />}
      {preview === "true" &&
        <div className="whitespace-pre-wrap overflow-y-auto">
          <Markdown text={text || ""} />
        </div>}
      <div className="h-4 shrink-0 grow" />
      <div className="flex items-center gap-2">
        {preview !== "true" && <>
          <WideShrinkableContrastAnchor>
            <Outline.PencilIcon className="size-4" />
            Edit
          </WideShrinkableContrastAnchor>
          <WideShrinkableNakedAnchor
            href={path.go(urlOf(path.url, { preview: true })).href}>
            <Outline.EyeIcon className="size-4" />
            Preview
          </WideShrinkableNakedAnchor>
        </>}
        {preview === "true" && <>
          <WideShrinkableNakedAnchor
            href={path.go(urlOf(path.url, { preview: false })).href}>
            <Outline.PencilIcon className="size-4" />
            Edit
          </WideShrinkableNakedAnchor>
          <WideShrinkableContrastAnchor>
            <Outline.EyeIcon className="size-4" />
            Preview
          </WideShrinkableContrastAnchor>
        </>}
      </div>
    </div>
    <div className="h-4" />
    <div className="">
      <span className="text-contrast">Optional: </span> Enter a webhook target to receive the signature
    </div>
    <div className="text-contrast">
      You will receive the text, address, and signature as JSON
    </div>
    <div className="h-4" />
    <div className="po-md bg-contrast rounded-xl">
      <input className="w-full bg-transparent outline-none"
        placeholder="https://example.com/api/onsignature"
        onChange={onRawApiChange}
        value={rawApi || ""} />
    </div>
    <div className="h-4" />
    <div className="flex items-center gap-2">
      <ShrinkableOppositeAnchor
        onKeyDown={shareCoords.onKeyDown}
        onClick={shareCoords.onClick}
        href={shareCoords.href}
        aria-disabled={!text}>
        <Outline.ShareIcon className="size-4" />
        Share
      </ShrinkableOppositeAnchor>
    </div>
    <div className="h-16" />
  </div>
}

export function Landing() {
  const path = usePathContext().getOrThrow()

  return <>
    <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
      <div className="h-[max(24rem,100dvh_-_16rem)] flex-none flex flex-col items-center">
        <div className="grow" />
        <h1 className="text-center text-6xl font-medium">
          The signature request protocol
        </h1>
        <div className="h-4" />
        <div className="text-center text-contrast text-2xl">
          Meet the Ethereum way of requesting an electronic signature
        </div>
        <div className="h-8" />
        <div className="flex items-center">
          <ShrinkableOppositeAnchor
            href={path.go("/make").href}>
            <Outline.SparklesIcon className="size-4" />
            Get started
          </ShrinkableOppositeAnchor>
        </div>
        <div className="grow" />
      </div>
    </div>
    <div className="po-md flex items-center justify-center">
      <a className="hover:underline"
        href="https://brume.money"
        target="_blank"
        rel="noreferrer">
        Made by cypherpunks
      </a>
    </div>
  </>
}

export default function Home() {
  return <Router />
}