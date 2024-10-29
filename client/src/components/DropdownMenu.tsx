import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {

  ChevronDownIcon,

} from '@heroicons/react/16/solid'
import { Link } from 'react-router-dom'

export default function DropdownMenu() {
  return (
    <div className="  text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner  focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          CREAR
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 flex flex-col p-3 shadow-2xl gap-2 origin-top-right border border-white/5 bg-black rounded-md text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link to="/new-product" className="bg-white uppercase text-center p-2 font-bold  rounded-md">crear producto</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/new-category" className="bg-white uppercase text-center p-2 font-bold rounded-md">crear categorias</Link>
          </MenuItem>
          
        </MenuItems>
      </Menu>
    </div>
  )
}