// import Footer from "./main/Footer";
import { useChainId } from "wagmi";
import { USDT_CONTRACT } from "../common/constant";
import FormSubmit from "../components/FormSubmit";
import useShortenAddress from "../hooks/useShortenAddress";

const MainLayout = () => {
  const chainId = useChainId();
  const shortenedAddress = useShortenAddress(USDT_CONTRACT[chainId]);
  return (
    <div className="flex flex-col lg:w-[1000px] xl:w-[1220px] md:w-[70%] sm:w-[85%] lg:mt-4 px-6 sm:px-0 mx-auto relative mb-10">
      <div className="w-full z-50 flex flex-col lg:w-[33%] lg:absolute left-0 top-20 items-center justify-center">
        <div className="flex flex-col items-start justify-center mt-5 lg:gap-y-3 gap-y-5 lg:mt-0">
          <h1 className="text-left text-[44px] leading-[50px] lg:text-[54px] lg:leading-[60px] xl:text-[64px] xl:leading-[70px] font-square-medium lg:w-[calc(100%+150px)]">
            Ведущее платежное решение
          </h1>
          <p className="items-center text-base text-left text-text-1">
            Безопасность, скорость, анонимность увеличивают конверсию благодаря
            встроенной оптимизации, доступу к более чем 100 способам оплаты и
            оформлению заказа в один клик.
          </p>
        </div>

        <div className="w-full">
          <div className="flex justify-between w-full p-3 mt-3 border-none lg:p-4 rounded-large bg-overlayColor">
            <div className="flex items-center gap-x-2 lg:gap-x-3">
              <img className="w-12 lg:w-14" src="ic_tether.png" alt={"USDT"} />
              <div className="flex flex-col">
                <h4 className="text-lg sm:text-xl font-square-medium">USDT</h4>
                <p className="text-base sm:text-lg font-square-regular text-grayColor">
                  Tether
                </p>
              </div>
            </div>
            <div className="relative flex justify-end">
              <p className="text-lg text-text-1 sm:text-xl font-square-regular opacity-80">
                {shortenedAddress}
              </p>
            </div>
          </div>
          <FormSubmit />
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:ml-[150px]">
        <div className="lg:w-[90%] w-full xl:translate-x-10">
          <img
            className="hidden object-contain w-full lg:block"
            src="/img_right_square.avif"
            alt="img"
          />
          <img
            className="object-contain w-full lg:hidden"
            src="/ldp0030_compDark_v006_r2-mobile-FC-first.webp"
            alt="img"
          />
          <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-b from-transparent to-black"></div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
