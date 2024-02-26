import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth }: any = useAuth();
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      <main className="container  mx-auto mt-12">
        {auth?._id || token ? <Outlet /> : <Navigate to={"/"} />}
      </main>
      <Footer />
    </>
  );
};

export default RutaProtegida;
