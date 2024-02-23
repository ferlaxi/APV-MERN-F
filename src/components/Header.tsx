import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/cat-svgrepo-com.svg";

const Header = () => {
  const { cerrarSesion }: any = useAuth();

  return (
    <header className="py-5 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:flex items-center">
          <img className="w-14 mx-auto" src={logo} alt="logo" />
          <h1 className="font-bold text-2xl text-indigo-200 text-center">
            Administrador de Pacientes de{" "}
            <span className="text-white font-black">Veterinaria</span>
          </h1>
        </div>

        <nav id="navbar" className="flex gap-7 mt-5 lg:mt-0">
          <Link
            to={"/admin"}
            className="text-white text-lg font-bold px-4 py-2 hover:bg-white/20 transition-all duration-200"
          >
            Pacientes
          </Link>
          <Link
            to={"/admin/perfil"}
            className="text-white text-lg font-bold px-4 py-2 hover:bg-white/20 transition-all duration-200"
          >
            Perfil
          </Link>
          <button
            type="button"
            className="text-white text-lg font-bold px-4 py-2 hover:bg-white/20 transition-all duration-200"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
