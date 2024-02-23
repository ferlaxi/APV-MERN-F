import { useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Alerta = ({ alerta }: any) => {
  const ErrorMensaje = () => {
    useEffect(() => {
      toast.error(alerta.msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }, [alerta.usado]);
  };

  const OkMensaje = () => {
    useEffect(() => {
      toast.success(alerta.msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }, [alerta.usado]);
  };

  return (
    <div
      className={`${alerta.error ? ErrorMensaje() : OkMensaje()} text-[17px]`}
    >
      <ToastContainer />
    </div>
  );
};

export default Alerta;
