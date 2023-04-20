import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider , ChainId} from "@thirdweb-dev/react";
import './index.css';
import { StateContextProvider } from "./context";
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain} desiredChainId={ChainId.Goerli}>
        <Router>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
