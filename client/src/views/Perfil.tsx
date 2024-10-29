import { useEffect, useMemo, useState } from "react";
import useProductos from "../hooks/useProductos"
import { useServices } from "../hooks/useServices";
import { ContextProps, draftUser } from "../types"
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {

    const {orders, setAlert, alert} = useProductos() as ContextProps
    const {getOrders} = useServices()
    const {user, editUser} = useAuth("perfil")
    
    const msjAlert = String(alert?.message)

    const userOrders = useMemo(()=> orders.filter(i => i.user.id == user?.id),[orders])
    const progressOrders = useMemo(()=> userOrders.filter(i => i.state == 0),[userOrders])
    const completeOrders = useMemo(()=> userOrders.filter(i => i.state == 1),[userOrders])

    const [isEditar, setIsEditar] = useState(false)
    const [perfil,setPerfil] = useState<draftUser>({
        name: "",
        email: "",
        password: "",
        adress: "",
        phone: 0
    }) 

    useEffect(()=>{
        getOrders()

        setPerfil({
            name: user?.name,
            email: user?.email,
            password: user?.password,
            adress: user?.adress,
            phone: user?.phone
        })
        
        
    },[user])

    

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        
        if (perfil.name == '' || perfil.email == "" || perfil.password == '' || perfil.phone == 0) {
            setAlert({message: 'alguno de los campos no es valido o falta llenar', error: true})
            return
        }

        editUser(perfil, user?.id)
        setIsEditar(false)

        
    }

    const handleOnChange =(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{ 
            
                setPerfil({
                ...perfil,
                [e.target.id]:e.target.value,
            })

    }
 

  return (
    <div className={`${user?.admin ? 'grid-cols-1' : 'md:grid-cols-2'} grid  gap-3  `}>
        
        <div className="perfil-container bg-slate-100 shadow-lg border-4 md:h-screen p-2">
        {alert && (
            <p className={` text-center font-bold text-lg uppercase p-2 ${alert.error ? 'text-red-500' : ' text-blue-500'} ${alert.message== undefined ? ' hidden' : ' visible'} `}>{msjAlert}</p>
        )}
            <div className=" flex justify-between">
                <h1 className=" text-2xl font-bold uppercase">Perfil</h1>
                <button className="bg-black text-white p-1 text-sm rounded-md" type="button"
                onClick={()=>setIsEditar(!isEditar)}
                >{isEditar ? 'Cancelar' : 'Editar'}</button>
            </div>

            <div>
            <form
                className="mt-5"
                >
            
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="name"
                    >Nombre:</label>
                    <input
                        disabled={!isEditar}
                        value={perfil.name}
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 "
                        placeholder="Ingresa tu correo"
                        name="name"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="email"
                    >Email:</label>
                    <input 
                    disabled={!isEditar}
                    value={perfil.email}
                        id="email"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 "
                        placeholder="Ingresa tu correo"
                        name="email"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="password"
                    >Contraseña:</label>
                    <input 
                    disabled={!isEditar}
                        value={perfil.password}
                        id="password"
                        type="password"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Ingresa tu contraseña"
                        name="password"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="phone"
                    >Telefono:</label>
                    <input 
                    disabled={!isEditar}
                    value={perfil.phone}
                        id="phone"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 "
                        placeholder="Ingresa tu numero de celular"
                        name="phone"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-4  flex flex-col">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="adress"
                    >Direccion</label>
                    <textarea 
                    disabled={!isEditar}
                    value={perfil.adress}
                        name="adress" 
                        id="adress"
                        className=" p-2 mt-2 border-2 bg-white"
                        onChange={handleOnChange}
                        >
                    </textarea>
                </div>
                
                <button className={`${isEditar ? 'visible' : 'hidden'} mt-5 w-full bg-black p-2 text-white font-bold text-lg cursor-pointer rounded`} 
                type="button"
                onClick={handleSubmit}
                >GUARDAR DATOS</button>
                
            </form>
        </div>

        </div>
        
        <div className={`pedidos-container shadow-lg ${user?.admin ? 'hidden' : 'visible'}  bg-slate-600 md:h-screen p-2`}>
            
            <h1 className=" text-2xl mt-5 text-white font-bold uppercase" >Pedidos</h1>

            <div className=" flex flex-col justify-between gap-4 py-5">
                <div className=" min-h-40 ">
                    <h2 className=" bg-yellow-300 p-1 font-bold">En progreso</h2>

                    {progressOrders.map(i => (
                        <div key={i.id} className=" bg-yellow-100 p-2 mt-2">
                            <div className=" flex justify-between items-center">
                                <div className="">
                                    <p className=" font-bold">Orden N°: {i.id}</p>
                                    <p className=" font-bold">Total: {i.totalOrder.toFixed(2)}</p>
                                </div>
                                <div className=" ">
                                    <p className=" font-bold text-sm">Fecha: {i.createdAt.split('T')[0]}</p>
                                </div>
                            </div>
                            <hr className=" border-2" />
                            {i.products.map(j => (
                                <div className=" flex gap-2">
                                    <p>- {j.name}</p> <span>/{j.quantity} u</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className=" min-h-40 ">
                    
                    <h2 className=" bg-green-400 p-1 font-bold">Completados</h2>

                    {completeOrders.map(i => (
                        <div key={i.id} className=" bg-green-200 p-2 mt-2">
                            <div className=" flex justify-between items-center">
                                <div className="">
                                    <p className=" font-bold">Orden N°: {i.id}</p>
                                    <p className=" font-bold">Total: {i.totalOrder.toFixed(2)}</p>
                                </div>
                                <div className=" ">
                                    <p className=" font-bold text-sm">Fecha: {i.createdAt.split('T')[0]}</p>
                                </div>
                            </div>
                            
                            {i.products.map(j => (
                                <div className=" flex gap-2">
                                    <p>- {j.name}</p> <span>/{j.quantity} u</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
