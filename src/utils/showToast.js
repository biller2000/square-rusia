import { Slide, toast } from "react-toastify";

export default function showToast(type, message, config = {}) {
  toast(message, {
    type: type,
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0.2,
    theme: "light",
    transition: Slide,
    ...config,
  });
}
