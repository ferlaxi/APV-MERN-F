import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext({});

const PacientesProvider = ({ children }: any) => {
  const [pacientes, setPacientes] = useState<any>([]);
  const [paciente, setPaciente] = useState<any>({});

  const { auth }: any = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("pacientes", config);
        setPacientes(data.pacientes.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [pacientes, auth]);

  const setEdicion = (paciente: any) => {
    setPaciente(paciente);
  };

  const guardarPaciente = async (paciente: any) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const pacienteActualizado = pacientes.map((pacienteState: any) =>
          pacienteState._id === data.pacienteActualizado._id ? data.pacienteActualizado : pacienteState
        );
        setPacientes(pacienteActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteGuardado } =
          data.pacienteAlmacenado;
        setPacientes([pacienteGuardado, ...pacientes]);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  const eliminarPaciente = async (id: any) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    Swal.fire({
      title: "¿Estas seguro que desea borrar?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3949ab",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clienteAxios.delete(`/pacientes/${id}`, config);
          const pacientesActualizados = pacientes.filter(
            (pacienteState: any) => pacienteState._id !== id
          );
          setPacientes(pacientesActualizados);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Borrado",
          text: "El paciente ha sido removido.",
          icon: "success",
          confirmButtonColor: "#3949ab",
        });
      }
    });
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };
export default PacientesContext;
