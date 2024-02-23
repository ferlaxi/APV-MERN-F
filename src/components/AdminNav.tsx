import { NavLink } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav id="navbar" className="flex gap-4 lg:justify-start justify-center">
        <NavLink className="font-bold text-gray-600 hover:bg-gray-300 transition-all duration-200 bg-gray-200 p-3 rounded-md" to={'/admin/perfil'}>
            Editar Perfil
        </NavLink>
        <NavLink className="font-bold text-gray-600 hover:bg-gray-300 transition-all duration-200 bg-gray-200 p-3 rounded-md" to={'/admin/cambiar-password'}>
            Cambiar Password
        </NavLink>
    </nav>
  )
}

export default AdminNav