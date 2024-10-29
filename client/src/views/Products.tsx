

import { useServices } from "../hooks/useServices"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useMemo, useState } from "react"
import useProductos from "../hooks/useProductos"
import { ContextProps, Product } from "../types"
import DropdownMenu from "../components/DropdownMenu"


export default function Products() {
    const {productos, isLoading, getProductById, getCategories} = useServices()
    const {mutateUser, user} = useAuth('guest')
    const {categorias} = useProductos() as ContextProps

    const [productsGrid,setProductGrid] = useState(true)
    const [productFilterCategory, setProductFilterCategory] = useState(0)
    const [productFilterSearch, setProductFilterSearch] = useState('')
    const [filter,setFilter] = useState<Product[] >()
    
    const filterCategory = useMemo(()=> productos?.data.filter(i => productFilterCategory ? i.categoryId == productFilterCategory : productos.data), [productFilterCategory,productos])

    const filterSearch = useMemo(()=> productos?.data.filter(i => productFilterSearch ? i.name.toUpperCase().includes(productFilterSearch.toUpperCase()) || i.id.toString().includes(productFilterSearch) : productos.data), [productFilterSearch,productos])

    useEffect(()=>{
        mutateUser()
        getCategories()
    },[])

    useEffect(()=>{
        if (productFilterCategory ) {
            setFilter(filterCategory)
            
        }else if (productFilterSearch) {
            setFilter(filterSearch)
        }else{
            setFilter(productos?.data)
        }
        
        
    },[filterCategory, filterSearch])

    const handleOnChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{ 
        setProductFilterCategory(+e.target.value)
        console.log(e.target.value);
        
    }
    
    
  return (
      <div className='md:m-10 p-2 md:p-8 bg-white min-h-screen'>
        {isLoading && (<p>Cargando....</p>)}

        <header className="  font-bold items-center">
            <div className=" flex justify-between">
                <div >
                    <h2 className="text-4xl text-gray-600 font-black">Productos</h2>
                </div>

                {user?.admin && (
                <div>
                    <DropdownMenu/>
                </div>
                )}
            </div>
            <div className=" md:flex gap-2 items-center">
                <div>
                    <select className="w-full border-2 mt-2 p-2 uppercase " name="categoryFilter" id="categoryFilter" onChange={handleOnChange}>
                        <option value=''>todos</option>
                        
                        {categorias?.map(i=> (
                        <option key={i.id} value={i.id}>{i.name}</option>
                        ))}
                    </select>
                </div>
                <div className=" hidden md:flex ">
                    <button className=" border-4 px-2 " type="button" onClick={()=>setProductGrid(true)}>|||</button>
                    <button className=" border-4 px-2 " type="button" onClick={()=>setProductGrid(false)}>--</button>
                </div>
                <div>
                    <input className=" border-2 p-3 text-xs w-full rounded-md my-2" type="text" name="search" id="" placeholder="Buscar por NOMBRE o CODIGO" onChange={(e)=>setProductFilterSearch(e.target.value)}/>
                </div>
            </div>
        </header>
        
        {productsGrid ? (
            <body className=" md:my-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-center ">
                {filter?.map(i=> (
                    <div key={i.id} className=" border-2 bg-slate-100 p-1 flex flex-col justify-between">
                        {i.image ? (
                            <img className="w-full min-h-32 max-h-40 md:max-h-40 md:min-h-40" src={`http://localhost:4000/${i.image}`} alt="" />
                        ) : (
                            <p className=" bg-gray-700 min-h-32 md:min-h-40">p</p>
                        )}
                        <div className="my-2">
                            <h2 className=" md:text-xl font-bold uppercase" >{i.name}</h2>
                            
                        </div>

                        
                        
                        <div className=" ">
                            <div>
                                <p  className=" text-lg text-green-700 font-bold" >${i.price}</p>
                            </div>
                            {user?.admin && (
                                <p>Cantidad: {i.cuantity} unidades</p>
                            )}
                            <div>
                                <p className=" text-xs">{i.category?.name}</p>    
                            </div>
                            <button className="bg-black w-full py-2 text-white  uppercase rounded-md" type="button" onClick={()=>getProductById(i.id) }>{user?.admin ? "Editar" : "Ver Producto"}</button>
                            
                            
                        </div>
                        
                    </div>
                ))}
            </body>
        ) : (
            <body className="my-5 ">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            {user?.admin && (<th className="p-2">Id</th>)}
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Cantidad</th>
                            <th className="p-2">Categoria</th>
                            <th className="p-2 hidden lg:visible">Image</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {filter?.map(i  => (
                            <tr key={i.id} className=" border-2 font-bold text-center ">
                                {user?.admin && (
                                    <td className="p-3 lg:text-lg text-gray-800  border">
                                    {i.id}
                                </td>
                                )}
                                <td className="p-3 lg:text-lg text-gray-800 border uppercase">
                                    {i.name}
                                </td>
                                <td className="p-3 lg:text-lg text-gray-800  border">
                                    ${i.price}
                                </td>
                                
                                <td className="p-3 lg:text-lg text-gray-800 border ">
                                    <p>{i.cuantity}</p>
                                </td>
                                <td className="p-3 lg:text-lg text-gray-800 border">
                                    <p>{i.category?.name}</p>
                                </td>
                                <td className="p-3 lg:text-lg max-w-20 text-gray-800  border hidden lg:visible">
                                {i.image && <img className="   max-h-10" src={`http://localhost:4000/${i.image}`} alt="" />}
                                </td>
                                {user?.admin ? (
                                <td className="p-3 text-xs text-gray-800 flex flex-col gap-2">
                                    <button className="bg-indigo-500 text-white p-2 uppercase rounded-md" type="button" onClick={()=>getProductById(i.id) }>editar</button>

                                    
                                </td>
                                ) : (
                                <td className="p-3 text-xs text-gray-800 flex flex-col gap-2 ">
                                    <button className="bg-indigo-500 text-white p-2 uppercase rounded-md" type="button" >Añadir al carrito</button>
                                </td>
                                )}
                            </tr> 
                        ))}
                    </tbody>
                </table>
        </body>
        )}

        

    </div>
  )
}
