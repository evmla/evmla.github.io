import { Chain } from "@usedapp/core";

export const EvmosChain: Chain = {
  chainId: 9001,
  chainName: "Evmos",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x0Ccea650B1b97264957c4A6bA4e097DA30b0604E",
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
  multicallAddress: "0x0Ccea650B1b97264957c4A6bA4e097DA30b0604E",
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
