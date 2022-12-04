import { Chain } from "@usedapp/core";

const EvmosChain: Chain = {
  chainId: 9001,
  chainName: "Evmos",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x409d89416C593E7f275Dc2B6c95Bd30B2e55E771",
  getExplorerAddressLink: (address: string) =>
    `https://evm.evmos.org/#/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://evm.evmos.org/#/tx/${transactionHash}`,
  rpcUrl: "https://eth.bd.evmos.org:8545",
  blockExplorerUrl: "https://evm.evmos.org/",
  nativeCurrency: {
    name: "EVMOS Token",
    symbol: "EVMOS",
    decimals: 18,
  },
};

const EvmosTestChain: Chain = {
  chainId: 9000,
  chainName: "Evmos Testnet",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0x72FD80767E43F0317e5b6E132eAfAeD92ea6a68d",
  getExplorerAddressLink: (address: string) =>
    `https://evm.evmos.dev/#/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://evm.evmos.dev/#/tx/${transactionHash}`,
  rpcUrl: "https://eth.bd.evmos.dev:8545/",
  blockExplorerUrl: "https://evm.evmos.dev/",
  nativeCurrency: {
    name: "EVMOS Token",
    symbol: "tEVMOS",
    decimals: 18,
  },
};

const TestChain: Chain = {
  chainId: 31337,
  chainName: "Testnet",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  getExplorerAddressLink: (address: string) => ``,
  getExplorerTransactionLink: (transactionHash: string) => ``,
  rpcUrl: "http://localhost:8545/",
  blockExplorerUrl: "",
  nativeCurrency: {
    name: "Token",
    symbol: "TST",
    decimals: 18,
  },
};

export default EvmosChain;
