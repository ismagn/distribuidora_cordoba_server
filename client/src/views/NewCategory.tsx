import {  useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { ContextProps, DraftCategory } from "../types"
import { useServices } from "../hooks/useServices"
import useProductos from "../hooks/useProductos"

export default function NewCategory() {

    const {categorias} = useProductos() as ContextProps
    const {addCategory, getCategories, deleteCategory} = useServices()
    
    const [category,setCategory] = useState<DraftCategory>({
        name: ""
    }) 


    useEffect(()=>{
        getCategories()
        
    },[])
    

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        
        if (category.name == '' ) {
            console.log('alguno de los campos no es valido');
            return
        }
            await addCategory(category)

        
        setCategory({
            name: ""
        })    
    
    }


    const handleOnChange =(e: React.ChangeEvent<HTMLInputElement>)=>{ 
            
            setCategory({
                ...category,
                [e.target.id]: (e.target.value),
            })
        
    }



  return (
    <div className="p-10">
        <div className="text-center">
            <Link to={'/products'} className="p-3 bg-indigo-600 text-white font-bold rounded-md uppercase">Volver a productos</Link>
        </div>
        <div className="bg-blue-200 my-14 w-1/3 mx-auto p-2 rounded-md">
            <h2 className=" font-bold text-xl text-center mb-3">Categorias Actuales</h2>
            {categorias?.map(i=> (
                <div key={i.id} className=" flex items-center border rounded-md border-black my-2 justify-between">
                    <p className=" uppercase font-bold ">- {i.name}</p>
                    <button 
                    className=" text-white p-2 text-xs bg-red-700 rounded-md"
                    onClick={()=>deleteCategory(+i.id)}
                    >ELIMINAR</button>
                </div>
            ))}
        </div>
        <div>
            <form
                className="mt-10"
                >
                    <h2 className="text-3xl font-black text-center mt-24 mb-10">CREAR NUEVA CATEGORIA</h2>
            
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="name"
                    >Nombre Categoria:</label>
                    <input 
                    value={category.name}
                        
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 uppercase"
                        placeholder="Nombre del Producto"
                        name="name"
                        onChange={handleOnChange}
                    />
                </div>
                
                <button type="button" className="bg-indigo-500 text-white p-2 rounded-md font-bold w-full cursor-pointer" 
                onClick={handleSubmit}
                >CREAR CATEGORIA</button>
                
                
            </form>
        </div>
        
    </div>
  )
}
