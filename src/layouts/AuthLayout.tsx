import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 md:mt-16 mt-16 lg:mt-0 lg:h-screen gap-14 p-2 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;