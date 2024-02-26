import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const [usado, setUsado] = useState(false);
  const [perfil, setPerfil] = useState({
    email: "",
    nombre: "",
    telefono: "",
    web: "",
    _id: "",
  });
  const [alerta, setAlerta] = useState({});
  const { auth, actualizarPerfil }: any = useAuth();

  useEffect(() => {
    setPerfil(auth.veterinario);
  }, [auth, auth.veterinario]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const resultado = await actualizarPerfil(perfil, usado);
    setAlerta(resultado);
    setUsado(resultado.usado);
  };

  const { msg }: any = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-2xl text-center mt-10 text-gray-600">
        Editar Perfil
      </h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">información</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-7">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="font-bold text-gray-600">Nombre</label>
              <input
                type="text"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese Nombre"
                name="nombre"
                defaultValue={perfil?.nombre}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold text-gray-600">Sitio Web</label>
              <input
                type="text"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese su Sitio Web"
                name="web"
                defaultValue={perfil?.web}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold text-gray-600">Teléfono</label>
              <input
                type="text"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese su Teléfono"
                name="telefono"
                defaultValue={perfil?.telefono}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold text-gray-600">Email</label>
              <input
                type="text"
                className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
                placeholder="Ingrese su Email"
                name="email"
                defaultValue={perfil?.email}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Información"
              className="lg:w-full w-full px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
