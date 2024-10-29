import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {

  ChevronDownIcon,

} from '@heroicons/react/16/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function MovilUserMenu() {
  const {user, logout} = useAuth('')

  return (
    <div className="  text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner  focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          MENU
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 flex flex-col p-3 shadow-2xl gap-2 origin-top-right border border-black/35 rounded-md bg-white/85 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link to={'/'} className=' bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer'>INICIO</Link>
          </MenuItem>
          
          <MenuItem>
            <Link to={'/products'} className=' bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer'>PRODUCTOS</Link>
          </MenuItem>

          <MenuItem>
          {user ? (
              <Link to="/perfil" className="uppercase  bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer">MI PERFIL</Link>
          ) : (
              <Link to="/auth" className="uppercase  bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer">Iniciar Sesion</Link>
          )}
          </MenuItem>

          
          {!user && (<Link to="/auth/register" className="uppercase  bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer"> REGISTRARSE</Link>) }
          
          {user && (
            <button  className="uppercase  bg-black text-white p-2 rounded-md text-center font-bold cursor-pointer" onClick={logout}>cerrar sesion</button>
          )}
          
          
          
        </MenuItems>
      </Menu>
    </div>
  )
}