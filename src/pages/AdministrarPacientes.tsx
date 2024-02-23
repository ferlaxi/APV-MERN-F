import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="w-full md:w-auto px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 mb-5 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {!mostrarFormulario ? "Mostrar Formulario" : "Ocultar Formulario"}
      </button>
      <div
        className={`${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;
