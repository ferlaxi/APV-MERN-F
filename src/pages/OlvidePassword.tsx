import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import logo from "../assets/cat-svgrepo-com black.svg";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const [usado, setUsado] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setUsado(true);
      setAlerta({
        msg: "El Email es obligatorio",
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      setUsado(true);
      setAlerta({
        msg: data.message,
        error: false,
        usado: usado,
      });
      setEmail("");
      setUsado(!usado);
    } catch (error: any) {
      setUsado(true);
      setAlerta({
        msg: error.response.data.message,
        error: true,
        usado: usado,
      });
      setUsado(!usado);
    }
  };

  const { msg }: any = alerta;

  return (
    <>
      <div className="lg:flex">
        <img className="w-32" src={logo} alt="logo" />
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no pierdas tus{" "}
          <span className="text-black/80">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-10 py-8 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <label className="text-gray-600  block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="w-full md:w-auto px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
          />
        </form>

        <div className="mt-10 lg:flex lg:justify-between">
          <div className="flex items-center gap-x-2 text-gray-500 text-center my-5">
            ¿Ya tienes una Cuenta?
            <Link
              className="text-gray-500 underline hover:text-black transition-all duration-200"
              to={"/"}
            >
              Inicia Sesión
            </Link>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500 text-center my-5">
            ¿No tienes una Cuenta?
            <Link
              className="text-gray-500 underline hover:text-black transition-all duration-200"
              to={"/registrar"}
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlvidePassword;
