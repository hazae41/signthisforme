import "@hazae41/symbol-dispose-polyfill";

import "@/styles/index.css";

import { Errors } from "@/libs/errors";
import { Outline } from "@/libs/heroicons";
import { HTMLInputEvents } from "@/libs/react/events";
import { ChildrenProps } from "@/libs/react/props/children";
import { RoundedShrinkableNakedButton, ShrinkableNakedButton, WideShrinkableContrastButton } from "@/libs/ui/buttons";
import { Menu } from "@/libs/ui/menu";
import { AppKit } from "@/mods/contexts/web3modal";
import { HashPathProvider, SearchSubpathProvider, usePathContext, useSearchSubpath } from "@hazae41/chemin";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export function ClientOnly(props: ChildrenProps) {
  const { children } = props

  const [client, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  if (!client)
    return null

  return <>{children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>SignThisFor.Me</title>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
      <meta key="application-name" name="application-name" content="SignThisFor.Me" />
      <meta key="description" name="description" content="Sign This For Me" />
      <meta key="color-scheme" name="color-scheme" content="dark light" />
      <meta key="theme-color-light" name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta key="theme-color-dark" name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
      <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="SignThisFor.Me" />
      <meta key="apple-mobile-web-app-status-bar-style" name="apple-mobile-web-app-status-bar-style" content="white" />
      <meta key="referrer" name="referrer" content="no-referrer" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <ClientOnly>
      <HashPathProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HashPathProvider>
    </ClientOnly>
  </>
}

export function Layout(props: ChildrenProps) {
  const { children } = props
  const path = usePathContext().getOrThrow()
  const share = useSearchSubpath(path, "share")

  const modal = useWeb3Modal()
  const account = useWeb3ModalAccount()

  const onAccountClick = useCallback(() => Errors.runAndLogAndAlert(async () => {
    await modal.open()
  }), [modal])

  return <AppKit>
    <SearchSubpathProvider value="share">
      {share.url.pathname === "/open" &&
        <Menu>
          <ShareMenu />
        </Menu>}
    </SearchSubpathProvider>
    <main className="p-safe h-full w-full flex flex-col overflow-y-scroll animate-opacity-in">
      <div className="po-md flex items-center">
        <img className="size-5"
          src="/favicon.png" />
        <div className="w-2" />
        <a className="font-bold text-lg"
          href={path.go("/").href}>
          SignThisFor.Me
        </a>
        <div className="w-2 grow" />
        {account.address != null &&
          <ShrinkableNakedButton onClick={onAccountClick}>
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </ShrinkableNakedButton>}
      </div>
      {children}
    </main>
  </AppKit>
}

export function ShareMenu() {
  const path = usePathContext().getOrThrow()

  const [copied, setCopied] = useState(false)

  const url = path.url.searchParams.get("url")!

  const onCopyClick = useCallback(() => Errors.runAndLog(async () => {
    await navigator.clipboard.writeText(url)
    setTimeout(() => setCopied(false), 300)
    setCopied(true)
  }), [url])

  const onShareClick = useCallback(() => Errors.runAndLog(async () => {
    const title = "Sign This For Me"
    const text = "Check out this text to sign"
    await navigator.share({ title, text, url })
  }), [url])

  return <>
    <div className="po-md flex items-center bg-contrast rounded-xl">
      <input className="w-full bg-transparent outline-none"
        onFocus={HTMLInputEvents.select}
        value={url}
        readOnly />
      <div className="w-2" />
      <div className="flex items-center">
        <RoundedShrinkableNakedButton
          onClick={onCopyClick}>
          {!copied && <Outline.ClipboardIcon className="size-4" />}
          {copied && <Outline.CheckIcon className="size-4" />}
        </RoundedShrinkableNakedButton>
      </div>
    </div>
    {"share" in navigator && <>
      <div className="h-2" />
      <WideShrinkableContrastButton
        onClick={onShareClick}>
        <Outline.ShareIcon className="size-4" />
        Share
      </WideShrinkableContrastButton>
    </>}
  </>
}