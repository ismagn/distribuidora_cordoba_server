import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import {

  ChevronDownIcon,

} from '@heroicons/react/16/solid'
import useProductos from '../hooks/useProductos'
import { Cart, ContextProps, Product } from '../types'
import { useMemo} from 'react'
import { useServices } from '../hooks/useServices'
import { useAuth } from '../hooks/useAuth'



export default function Order() {
  const {cart, setCart} = useProductos() as ContextProps
  const {user} = useAuth("")
  const {createOrder} = useServices()

  
  const totalCart = useMemo(()=> cart.reduce((total, i) => total + i.total,0),[cart])
  

  const calculateQuantity = (id : Product['id'], newQuantity : Cart['quantity'])=>{
    

    if (newQuantity==0) {
      const newCart = cart.filter(i=> i.id !== id )
      setCart(newCart);
      
    }
    
    setCart((prevCart) =>
      prevCart?.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity, total: item.price*newQuantity } : item
      )
    );
    
  }
  
    

  return (
    <div className=" text-right">
      <Menu>
        <MenuButton className="relative inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner  focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Carrito
          <ChevronDownIcon className="size-2 fill-white/60" />
          {cart.length > 0 && (
            <p className={` animate-pulse absolute top-0 right-0 bg-white rounded-full w-4  text-red-700 text-md `}>{cart.length}</p>
          )}
        </MenuButton>

          <MenuItems
          transition
          anchor="bottom end"
          className="w-5/6 md:w-1/3 h-3/5 flex flex-col p-3 shadow-2xl gap-2 origin-top-right border border-white/5 bg-white/90 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <h2 className=' text-xl font-bold text-center'>ORDEN</h2>
          {cart?.map(i=> (
          <div key={i.id}>
          <div className='bg-black p-2 flex gap-3'>
            <div className=' bg-white max-w-36 md:w-1/3 p-2 flex items-center '>
              <img className="" src={`http://localhost:4000/${i.image}`} alt="" />
            </div>
            <div className=' w-auto '>
              <p className=' text-white  text-xs'>ID: {i.id}</p>
              <p className=' text-white font-bold  md:text-lg'>{i.name}</p>
              <p className=' text-white'>Precio: <span className=' text-green-400 font-bold'>$ {i.total.toFixed(2)} MXN</span> </p>
              <div className='text-white'>
                <label className=''  htmlFor="">Cantidad</label>
                <div className=' flex text-center items-center gap-3'>
                  <button className=' border-2 rounded-full px-1.5  text-lg font-extrabold' type="button" onClick={()=>calculateQuantity(i.id, i.quantity - 1)} disabled={i.quantity < 1}>-</button>
                  <p>{i.quantity}</p>
                  <button className=' border-2 rounded-full px-1  text-lg font-bold' type="button" onClick={()=>calculateQuantity(i.id, i.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
            
          </div>
          ))}

          {cart.length ? (
            <>
          <div>
            <p className=' w-full text-center p-2 text-2xl font-bold'>TOTAL: $ {totalCart.toFixed(2)} MXN</p>
          </div>

            <div>
              <button type="button" className='bg-black p-2 text-white rounded-md w-full uppercase font-bold' onClick={()=>createOrder(Number(user?.id),cart, totalCart)}>Enviar Orden</button>
          </div>
          </>
          ) : (
            <p className=' capitalize text-center mt-10 text-gray-400 font-bold text-xl'>aun no hay productos en el carrito</p>
          )}
          
        </MenuItems>
        
      </Menu>
    </div>
  )
}