import useProductos from "../hooks/useProductos"
import { useServices } from "../hooks/useServices"
import { ContextProps } from "../types"
import { sendWhatsApp } from "../helpers/sendWathsApp"
import { useEffect, useMemo } from "react"
import { Link } from "react-router-dom"

export default function CompleteOrders() {
  
    const {orders} = useProductos() as ContextProps
    const {getOrders, completeOrder} = useServices() 
    const completeOrders = useMemo(()=> orders.filter(i=> i.state == 1),[orders])

    useEffect(()=>{
        getOrders()
    },[])

  return (
    <div>
        <div className=" flex justify-end  min-h-10 p-2  ">
            <Link to={'/orders'} className=" bg-black p-2 rounded-md text-white font-bold">ORDENES ACTIVAS</Link>
        </div>
        <div className=" text-center  text-xl font-bold text-gray-400">
            {completeOrders.length == 0 && (
                <h2>Aun no hay Ordenes Completadas</h2>
            )}
        </div>
        <div className=" grid grid-cols-3 p-5 gap-3">
        {completeOrders.map(i => (
            <div key={i.id} className=" flex flex-col justify-between bg-indigo-200 p-2 rounded-lg shadow-lg">
                <div>
                    <p className=" font-extrabold">Orden N°: {i.id}</p>
                    <p className=" font-extrabold">Fecha: {i.createdAt.split('T')[0]}</p>
                    <p className=" font-bold">Cliente: {i.user.name}</p>
                
                <br />
                <h2 className=" font-bold text-lg uppercase">Productos</h2>
                
                {i.products?.map(j => (
                    <div key={j.id} className="">
                        <p className=" uppercase">- {j.name}</p>
                        <p>Precio Unitario: {j.price}</p>
                        <p>Cantidad: {j.quantity}</p>
                        <br />
                    </div>
                ))}
                </div>
                
                <div className="flex flex-col gap-2 items-end mt-5">
                    <hr className=" bg-black border-2 border-blue-700 w-full" />
                    <p className=" uppercase font-bold text-lg"> Total: $<span className=" text-green-600"> {i.totalOrder}</span></p>
                    <button type="button"
                    className=" bg-green-600 rounded-md p-2 text-white font-bold w-full"
                    onClick={()=>sendWhatsApp(i.user.phone,i)}
                    >CONTACTAR POR WHATSAPP</button>

                    <button type="button"
                    className={`${i.state == 0 ? 'bg-black' : 'bg-green-700'} bg-black rounded-md p-2 text-white font-bold w-full`}
                    onClick={()=>{completeOrder(i.id), window.location.reload()}}
                    >{i.state == 0 ? 'COMPLETAR PEDIDO' : 'COMPLETADO'}</button>
                </div>
            </div>
        ))}
        
    </div>
    </div>
  )
}
