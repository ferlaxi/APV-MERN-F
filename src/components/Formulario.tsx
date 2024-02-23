import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});
  const [usado, setUsado] = useState(false);

  const { guardarPaciente, paciente }: any = usePacientes();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setUsado(true);
      setAlerta({
        msg: "Todos los campos son necesarios",
        error: true,
        usado: usado
      });
      return setUsado(!usado)
    }
    guardarPaciente({ nombre, propietario, fecha, email, sintomas, id });
    setUsado(true);
    setAlerta({
      msg: "Guardado Correctamente",
      error: false,
      usado: usado,
    });
    setUsado(!usado)
    setNombre("");
    setPropietario("");
    setEmail("");
    setSintomas("");
    setFecha("");
    setId(null);
  };

  const { msg }: any = alerta;

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  return (
    <>
      <h1 className="font-black text-2xl text-center text-gray-700">
        Administrador de Pacientes
      </h1>

      <p className="font-bold text-lg text-center text-gray-600 mt-2">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-lg rounded-md mt-4"
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="font-bold text-gray-700">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="font-bold text-gray-700">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="font-bold text-gray-700">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Dirección de Email"
            className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="font-bold text-gray-700">
            Fecha de Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="font-bold text-gray-700">
            Sintomas del Paciente
          </label>
          <textarea
            id="sintomas"
            placeholder="Descripción de los Síntomas"
            className="w-full rounded-lg border-1 border-gray-300 focus:border-indigo-600 p-3 bg-gray-50 mt-2"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Actualizar Paciente" : "Agregar Paciente"}
          className="lg:w-full w-full px-8 mt-4 bg-indigo-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-all duration-300"
        />
      </form>
    </>
  );
};

export default Formulario;
