import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pw_actual: "",
    pw_nuevo: "",
  });
  const [usado, setUsado] = useState(false);

  const { guardarPassword }: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const respuesta = await guardarPassword(password, usado);
    setAlerta(respuesta);
    setUsado(respuesta.usado);
  };

  const { msg }: any = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-2xl text-center mt-10 text-gray-600">
        Cambiar Password
      </h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Modifica tu <span className="text-indigo-600 font-bold">Password</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-7">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="font-bold text-gray-600">Password Actual</label>
              <input
                type="password"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese Password"
                name="pw_actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold text-gray-600">Password Nuevo</label>
              <input
                type="password"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese su nuevo Password"
                name="pw_nuevo"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="lg:w-full w-full px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
