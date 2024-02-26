import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import logo from "../assets/cat-svgrepo-com black.svg";

const Login = () => {
  const [alerta, setAlerta] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usado, setUsado] = useState(false);

  const { msg }: any = alerta;
  const navigate = useNavigate();
  const { setAuth, setAux, aux }: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    

    if ([email, password].includes("")) {
      setUsado(true);
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/admin");
      setAuth(data);
      setAux(!aux)
    } catch (error: any) {
      setUsado(true);
      setAlerta({
        msg: error.response.data.message,
        error: true,
        usado: usado,
      });
      return setUsado(!usado);
    }
  };

  return (
    <>
      <div className="lg:flex">
        <img className="w-32" src={logo} alt="logo" />
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus{" "}
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

          <input
            type="submit"
            value="Iniciar Sesion"
            className="w-full md:w-auto px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
          />
        </form>

        <div className="mt-10 lg:flex lg:justify-between">
          <div className="flex items-center gap-x-2 text-gray-500 text-center my-5">
            ¿No tienes una Cuenta?
            <Link
              className="text-gray-500 underline hover:text-black transition-all duration-200"
              to={"/registrar"}
            >
              Registrate
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

export default Login;
