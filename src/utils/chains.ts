import { Chain } from "@usedapp/core";

export const EvmosChain: Chain = {
  chainId: 9001,
  chainName: "Evmos",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x0066ee643f939C543C571d3c74bc03df421e14BD",
  getExplorerAddressLink: (address: string) =>
    `https://evm.evmos.org/#/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://evm.evmos.org/#/tx/${transactionHash}`,
  rpcUrl: "https://eth.bd.evmos.org:8545/",
  blockExplorerUrl: "https://evm.evmos.org/",
  nativeCurrency: {
    name: "EVMOS Token",
    symbol: "EVMOS",
    decimals: 18,
  },
};

export const EvmosTestChain: Chain = {
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
