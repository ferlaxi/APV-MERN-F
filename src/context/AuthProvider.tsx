import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error: any) {
        console.log(error.response.data.message);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  //actualizar perfil
  const actualizarPerfil = async (datos: any, datoUsado: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { nombre, email }: any = datos;
    if ([nombre, email].includes("")) {
      return {
        msg: "Email y Nombre son obligatorios",
        error: true,
        usado: !datoUsado,
      };
    }
    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await clienteAxios.put(url, datos, config);
      const { data } = await clienteAxios.get("/veterinarios/perfil", config);
      setAuth(data);
      return {
        msg: "Almacenado correctamente",
        error: false,
        usado: !datoUsado,
      };
    } catch (error: any) {
      return {
        msg: error.response.data.message,
        error: true,
        usado: !datoUsado,
      };
    }
  };

  //cambio psw usuario
  const guardarPassword = async (datos: any, estadoUsado: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (Object.values(datos).some((campo) => campo === "")) {
      return {
        msg: "Todos los campos son necesarios",
        error: true,
        usado: !estadoUsado,
      };
    }

    if (datos.pw_nuevo.length < 6) {
      return {
        msg: "El Password debe ser mínimo 6 caracteres",
        error: true,
        usado: !estadoUsado,
      };
    }

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: data.message,
        error: false,
        usado: !estadoUsado,
      };
    } catch (error: any) {
      return {
        msg: error.response.data.message,
        error: true,
        usado: !estadoUsado,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
