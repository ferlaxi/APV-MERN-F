import usePacientes from "../hooks/usePacientes";

const PacienteCard = ({ paciente }: any) => {
  const { email, fecha, nombre, propietario, sintomas, _id }: any = paciente;

  const { setEdicion, eliminarPaciente }: any = usePacientes();

  const formatearFecha = (fecha: any) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <div className="mx-5 my-4 bg-white shadow-md px-5 py-4 rounded-xl">
      <p className="font-bold text-gray-700 my-2">
        Nombre: <span className="font-normal normal-case">{nombre}</span>
      </p>
      <p className="font-bold text-gray-700 my-2">
        propietario:{" "}
        <span className="font-normal normal-case">{propietario}</span>
      </p>
      <p className="font-bold text-gray-700 my-2">
        Email Contacto: <span className="font-normal normal-case">{email}</span>
      </p>
      <p className="font-bold text-gray-700 my-2">
        Fecha de Alta:{" "}
        <span className="font-normal normal-case">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold text-gray-700 my-2">
        Sintomas: <span className="font-normal normal-case">{sintomas}</span>
      </p>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="py-2 px-7 bg-indigo-600 hover:bg-indigo-400 transition-all duration-200 font-bold text-white rounded-md"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-7 bg-red-600 hover:bg-red-400 transition-all duration-200 font-bold text-white rounded-md"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PacienteCard;
