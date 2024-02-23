import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import logo from "../assets/cat-svgrepo-com black.svg"


const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [usado, setUsado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        setUsado(!usado);
        setAlerta({
          msg: "Coloca tu nuevo Password",
          error: false,
          usado: usado,
        });
        setTokenValido(true);
        setUsado(!usado);
      } catch (error: any) {
        setUsado(!usado);

        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
          usado: !usado,
        });
        setUsado(!usado);
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password.length < 6) {
      setUsado(!usado);
      setAlerta({
        msg: "El Password debe tener mínimo 6 caracteres",
        error: true,
        usado: usado,
      });
      setUsado(!usado);
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setUsado(!usado);
      setAlerta({
        msg: data.message,
        error: false,
        usado: usado,
      });
      setUsado(!usado);

      setPasswordModificado(true);
    } catch (error: any) {
      setUsado(!usado);
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
          Reestablece tu Password y no pierdas a tus{" "}
          <span className="text-black/80">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-10 py-8 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-6">
                <label className="text-gray-600  block text-xl font-bold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Tu nuevo Password"
                  className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Reestablecer"
                className="w-full md:w-auto px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
              />
            </form>
            {passwordModificado && (
              <Link className="text-gray-500 block text-center my-5" to={"/"}>
                Iniciar Sesión
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
