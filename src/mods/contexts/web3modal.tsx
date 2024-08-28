import { ChildrenProps } from "@/libs/react/props/children"
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react"

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "41927edb07f50ccd7d0abc12b847413c"

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com"
}

// 3. Create a metadata object
const metadata = {
  name: "SignThisForMe",
  description: "Sign This For Me",
  url: "https://signthisfor.me",
  icons: []
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export function AppKit(props: ChildrenProps) {
  const { children } = props

  return <>{children}</>
}