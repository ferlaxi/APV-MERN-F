import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import logo from "../assets/cat-svgrepo-com black.svg";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmar = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.message,
        });
      } catch (error: any) {
        setAlerta({
          msg: error.response.data.message,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmar();
  }, []);

  return (
    <>
      <div className="lg:flex">
        <img className="w-32" src={logo} alt="logo" />
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y administra tus{" "}
          <span className="text-black/80">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-10 py-8 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className="text-gray-500 block text-center my-5" to={"/"}>
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
