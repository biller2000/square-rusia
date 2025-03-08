import PropTypes from "prop-types";
import ButtonPrimary from "../components/ButtonPrimary";
import { useAccount, useConnect } from "wagmi";
import useShortenAddress from "../hooks/useShortenAddress";
import { injected } from "wagmi/connectors";
import { useCallback } from "react";
import showToast from "../utils/showToast";

const NavBarItem = ({ title, className }) => {
  return <li className={`mx-4 cursor-pointer ${className}`}>{title}</li>;
};

const Header = () => {
  const { connect } = useConnect();
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const shortenedAddress = useShortenAddress(address);

  const onClickConnect = useCallback(() => {
    connect({ connector: injected(), chainId: 56 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(address);
    showToast("success", "You copied wallet address", {
      progress: 0.1,
    });
  }, [address]);
  return (
    <nav className="flex justify-between items-center p-5 w-full sm:max-w-[90%] mx-auto backdrop-blur-[1.5px] z-50">
      <a
        href={"/"}
        className="flex items-center justify-start ml-2 gap-x-[6px]"
      >
        <img className=" w-[30px]" src="/ic_square_white.png" alt="" />
        <h3 className="text-xl lg:text-[22px]">Square</h3>
      </a>
      {/* <div className="flex items-center lg:gap-x-2 xl:gap-x-3">
        <a
          href="/"
          className="hidden text-sm text-white transition-all rounded-full sm:flex sm:p-1 lg:p-2 lg:text-base xl:text-lg hover:text-white"
        >
          About
        </a>
        <a
          href="/"
          className="hidden text-sm text-white transition-all rounded-full sm:flex sm:p-1 lg:p-2 lg:text-base xl:text-lg hover:text-white"
        >
          Interchain Network
        </a>
        <a
          href="/"
          className="hidden text-sm text-white transition-all rounded-full sm:flex sm:p-1 lg:p-2 lg:text-base xl:text-lg hover:text-white"
        >
          Pricing
        </a>
        <a
          href="/"
          className="hidden text-sm text-white transition-all rounded-full sm:flex sm:p-1 lg:p-2 lg:text-base xl:text-lg hover:text-white"
        >
          Products
        </a>
      </div> */}
      <div className="flex items-center gap-x-4">
        <ButtonPrimary
          className="px-4 py-[10px] lg:px-5 lg:py-3 lg:min-w-[140px]"
          onClick={!isConnected ? onClickConnect : onClickCopyAddress}
          type={isConnected ? "outline" : "fullfil"}
          loading={isConnecting || isReconnecting}
        >
          {!isConnected ? (
            "Подключить кошелек"
          ) : (
            <>
              {shortenedAddress}
              <span className="tooltiptext">Нажмите, чтобы скопировать</span>
            </>
          )}
        </ButtonPrimary>
      </div>
    </nav>
  );
};

NavBarItem.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

// NavBarItem.propTypes = {
//   title: PropTypes.string,
//   className: PropTypes.string,
//   isActive: PropTypes.bool,
//   onClick: PropTypes.func,
// };

export default Header;
