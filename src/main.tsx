import React from "react";
import ReactDOM from "react-dom/client";
import { Config, DAppProvider, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";
import { HashRouter } from "react-router-dom";
import { EvmosChain } from "./utils/chains";

import "@fontsource/righteous";

import App from "./App";

const config: Config = {
  readOnlyChainId: EvmosChain.chainId,
  readOnlyUrls: {
    [EvmosChain.chainId]: EvmosChain.rpcUrl || "",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, EvmosChain],
  noMetamaskDeactivate: true,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <HashRouter>
        <App />
      </HashRouter>
    </DAppProvider>
  </React.StrictMode>
);
