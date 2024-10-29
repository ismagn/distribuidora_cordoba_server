import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Cart from "./Cart"
import MovilUserMenu from "./MovilUserMenu"




export default function Header() {

  const location = useLocation()
  const url = location.pathname
  
  console.log(url);
  
  const {user, logout} = useAuth('guest')  

  return (
    <div className="bg-black text-center">
        <img src="../public/img/banner-distribuidora.jpg" className=" w-full h-full bg-white p-5" alt="" />
        
        <nav className=" hidden text-white relative md:flex justify-around  m-auto p-5 items-center">
          <Link to={'/'}>HOME</Link>

          <Link to={'/products'}>PRODUCTOS</Link>
          
          {user ? (
              <Link to="/perfil" className="uppercase ">MI PERFIL</Link>
          ) : (
              <Link to="/auth" className="uppercase">Iniciar Sesion</Link>
          )}

          {!user && (<Link to="/auth/register" className="uppercase"> REGISTRARSE</Link>) }

          {user && (
            <button  className=" uppercase" onClick={logout}>cerrar sesion</button>
          )}

          {user?.admin ? (
              <Link className={`${(url == '/orders' || url == '/orders/completeOrders') && 'hidden'} bg-indigo-700 p-2 rounded-md`} to={'/orders'}>ORDENES</Link>
          ) : (
              <Cart/>
          )}

        </nav>
        <div className="  flex justify-between md:hidden items-center p-3">
          <div>
            <MovilUserMenu/>
          </div>

          <div className=" mx-1">
          {user?.admin ? (
                <Link className={`${(url == '/orders' || url == '/orders/completeOrders') && 'hidden'} bg-white font-bold p-2 rounded-md`} to={'/orders'}>ORDENES</Link>
            ) : (
                <Cart/>
            )}
          </div>
          
        </div>
        
    </div>
  )
}
