import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import logo from "../assets/cat-svgrepo-com black.svg"


const Registar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [usado, setUsado] = useState(false);

  const [msgAlerta, setMsgAlerta] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setUsado(true);
      setMsgAlerta({ msg: "Hay campos vacíos", error: true, usado: usado });
      return setUsado(!usado);
    }

    if (password != repetirPassword) {
      setUsado(true);
      setMsgAlerta({
        msg: "Los Password no son iguales",
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }

    if (password.length < 6) {
      setUsado(true);
      setMsgAlerta({
        msg: "El Password requiere mínimo 6 caracteres",
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }

    setMsgAlerta({});

    //Crear usuario en la api
    try {
      await clienteAxios.post(`/veterinarios`, { nombre, email, password });
      setUsado(true);
      setMsgAlerta({
        msg: "Creado correctamente, revisa tu Email",
        error: false,
        usado: usado,
      });
      setUsado(!usado);
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error: any) {
      setUsado(true);
      setMsgAlerta({
        msg: error.response.data.message,
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }
  };

  const { msg }: any = msgAlerta;

  return (
    <>
      <div className="lg:flex">
        <img className="w-32" src={logo} alt="logo" />
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra tus{" "}
          <span className="text-black/80">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-10 py-8 rounded-xl bg-white">
        {msg && <Alerta alerta={msgAlerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <label className="text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
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
          <div className="my-6">
            <label className="text-gray-600  block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="text-gray-600  block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
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
          <Link
            className="text-gray-500 block text-center my-5"
            to={"/olvide-password"}
          >
            Olvide mi Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registar;
