import BigNumber from "bignumber.js";
import { mainnet, bscTestnet, bsc } from "wagmi/chains";

export const TOKEN_DIVIDEND = BigNumber(10).pow(18);

export const SAVED_CHAIN_KEY = "current-chain";

export const DEFAULT_CHAIN_ID = import.meta.env.DEV ? bsc.id : mainnet.id;

export const TESTNET_CHAINS = [bscTestnet];

export const USDT_CONTRACT = {
  [bsc.id]: "0x55d398326f99059fF775485246999027B3197955",
  [bscTestnet.id]: "0x8545f2473324124c5371F831075A3163AF22f34F",
};
