import { useMemo } from "react";

export default function useShortenAddress(address) {
  const result = useMemo(() => {
    if (!address) {
      return address;
    }

    const length = address.length;

    return `${address.substring(0, 6)}...${address.substring(
      length - 4,
      length
    )}`;
  }, [address]);

  return result;
}
