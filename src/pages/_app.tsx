import "@hazae41/symbol-dispose-polyfill";

import "@/styles/index.css";

import { Errors } from "@/libs/errors";
import { ChildrenProps } from "@/libs/react/props/children";
import { ShrinkableNakedButton } from "@/libs/ui/buttons";
import { AppKit } from "@/mods/contexts/web3modal";
import { HashPathProvider, usePathContext } from "@hazae41/chemin";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import type { AppProps } from "next/app";
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
  return <ClientOnly>
    <HashPathProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HashPathProvider>
  </ClientOnly>
}

export function Layout(props: ChildrenProps) {
  const { children } = props
  const path = usePathContext().getOrThrow()

  const modal = useWeb3Modal()
  const account = useWeb3ModalAccount()

  const onAccountClick = useCallback(() => Errors.runAndLogAndAlert(async () => {
    await modal.open()
  }), [modal])

  return <AppKit>
    <main className="p-safe h-full w-full flex flex-col overflow-y-scroll animate-opacity-in">
      <div className="po-md flex items-center">
        <a className="font-bold text-lg"
          href={path.go("/").href}>
          Sign This For Me
        </a>
        <div className="grow" />
        {account.address != null &&
          <ShrinkableNakedButton onClick={onAccountClick}>
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </ShrinkableNakedButton>}
      </div>
      <div className="p-4 grow w-full m-auto max-w-4xl flex flex-col">
        {children}
      </div>
    </main>
  </AppKit>
}