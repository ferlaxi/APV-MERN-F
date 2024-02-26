import logo from "../assets/cat-svgrepo-com black.svg";

const Footer = () => {
  return (
    <footer className="py-7 font-bold text-gray-700 bg-gray-100 mt-44">
      <div className="flex md:justify-between md:items-center md:flex-row flex-col items-center container mx-auto md:gap-y-3 gap-y-2">
        <div className="flex md:items-center md:flex-row flex-col items-center md:gap-y-3 gap-y-2">
          <img className="w-14" src={logo} alt="logo" />
          <p>
            APV - Administración de Pacientes de{" "}
            <span className="text-indigo-700">Veterinaria</span>
          </p>
        </div>

        <p>
          Creado por{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/fer-laxi/"
            target="_blank"
          >
            Fernando Laxi
          </a>
        </p>

        <div>
          <p>©Todos los derechos reservados 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
