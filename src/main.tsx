import React from "react";
import ReactDOM from "react-dom/client";
import { Config, DAppProvider, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";
import { HashRouter } from "react-router-dom";
import DefaultChain from "./utils/chains";

import "@fontsource/righteous";

import App from "./App";

const config: Config = {
  readOnlyChainId: DefaultChain.chainId,
  readOnlyUrls: {
    [DefaultChain.chainId]: DefaultChain.rpcUrl || "",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, DefaultChain],
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
