import "@/styles/index.css";

import { ShrinkableOppositeButton } from "@/libs/ui/buttons";
import { AppKit } from "@/mods/contexts/web3modal";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import type { AppProps } from "next/app";
import { useCallback } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const modal = useWeb3Modal()
  const account = useWeb3ModalAccount()

  const onAccountClick = useCallback(() => {
    modal.open()
  }, [modal])

  return <AppKit>
    <div className="po-md flex items-center">
      <div className="font-medium text-lg">
        Sign This For Me
      </div>
      <div className="grow" />
      <ShrinkableOppositeButton onClick={onAccountClick}>
        {account.address ? "Connected" : "Connect"}
      </ShrinkableOppositeButton>
    </div>
    <Component {...pageProps} />
  </AppKit>
}
