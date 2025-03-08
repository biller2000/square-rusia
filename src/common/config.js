import { http, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

export const dappConfig = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    // bsc
    [bsc.id]: http(),

    // bsc testnet
    [bscTestnet.id]: http(),
  },
});
