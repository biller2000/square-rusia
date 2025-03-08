import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import Header from "./layouts/Header";
import { dappConfig } from "./common/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={dappConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen overflow-hidden bg-black">
          <div className="relative">
            <Header />
            <MainLayout />
          </div>
        </div>
        <ToastContainer />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
