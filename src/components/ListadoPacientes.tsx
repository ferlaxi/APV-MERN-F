import usePacientes from "../hooks/usePacientes";
import PacienteCard from "./PacienteCard";


const ListadoPacientes = () => {
  const { pacientes }: any = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h1 className="font-black text-2xl text-center text-gray-700">
            Listado de Pacientes
          </h1>

          <p className="font-bold text-lg text-center text-gray-600 mt-2">
            Añade tus pacientes y{" "}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

          {pacientes?.map((paciente: any) => (
            <PacienteCard key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h1 className="font-black text-2xl text-center text-gray-700">
            No hay Pacientes
          </h1>
          <p className="font-bold text-lg text-center text-gray-600 mt-2">
            Comienza agregando los tuyos y{" "}
            <span className="text-indigo-600 font-bold">apareceran aquí</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
