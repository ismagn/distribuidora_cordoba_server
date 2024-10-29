import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ContextProps, draftUserAuth } from "../types";
import useProductos from "../hooks/useProductos";


export default function Login() {

    const  {login, isLoadingUser} = useAuth('login')
    const {alert, setAlert} = useProductos() as ContextProps 

    const [user,setUser] = useState<draftUserAuth>({
        phone: 0,
        password: ""
    }) 

    const msjAlert = String(alert?.message)
    
    

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        
        if (user.password == '' || user.phone == 0 ) {
            setAlert({message: 'alguno de los campos no es valido o falta llenar', error: true})
            return
        }

        setAlert({message: '', error: true})


        login(user)
        
    }

    const handleOnChange =(e: React.ChangeEvent<HTMLInputElement> )=>{ 
            
                setUser({
                ...user,
                [e.target.id]:e.target.value,
            })

    }

  return (
    <div>
        {alert && (
            <p className={` text-center font-bold text-lg uppercase p-2 ${alert.error ? 'text-red-500' : ' text-blue-500'} ${alert.message== undefined ? ' hidden' : ' visible'} `}>{msjAlert}</p>
        )}
        <div>
            <form
                className="p-2 md:p-14"
                >
                
                <h1 className=" text-2xl uppercase font-bold text-center mb-4">iniciar sesion</h1>

                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="phone"
                    >Telefono:</label>
                    <input 
                    
                        
                        id="phone"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50 "
                        placeholder="Ingresa tu numero de celular"
                        name="phone"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="password"
                    >Contraseña:</label>
                    <input 
                        
                        id="password"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Ingresa tu contraseña"
                        name="password"
                        onChange={handleOnChange}
                    />
                </div>
                
                {isLoadingUser ? (
                    <button className="mt-5 w-full bg-gray-600 p-2 text-white font-bold text-lg cursor-pointer rounded" 
                    type="button"
                    >INICIANDO SESION</button>
                ) : (
                    <button className="mt-5 w-full bg-black p-2 text-white font-bold text-lg cursor-pointer rounded" 
                    type="button"
                    onClick={handleSubmit}
                    >INICIAR SESION</button>
                )}
                
                
            </form>
        </div>
    </div>
  )
}
