import { useNavigate } from "react-router-dom";
import type { Cart, Category, ContextProps, DraftCategory, Order, Product, User, draftProduct } from "../types";
import useSWR from 'swr';
import axios, { AxiosError} from "axios";
import useProductos from "./useProductos";





export const useServices = () => {
    const navigate = useNavigate()
    const {setProducto, setCategorias, setOrders, setCart, orders} = useProductos() as ContextProps
    
    
    

    const addProduct = async (product: draftProduct) => { 
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, product , {
                headers: {
                    'Content-Type': 'multipart/form-data' //para procesar archivos
                }
            })
            navigate('/products')
            await mutate()
            
            
        } catch (error) {
            console.log(error);
        }
    }

    
        const {data: productos, mutate, isLoading} = useSWR<{data: Product[]}>(`${import.meta.env.VITE_API_URL}/api/products`, ()=>
            axios(`${import.meta.env.VITE_API_URL}/api/products`, {
                headers: {
                    'Content-Type': 'multipart/form-data' //para procesar archivos
                }
            })
            .then(res => res.data)
            .catch(error =>{
                throw Error(error?.response?.data?.errors)
            })
        )


    const getProductById = async (id : Product['id']) => { 
        try {
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            setProducto(data.data)
            navigate(`/update-product/${id}`)
            
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = async (product : draftProduct , id : Product['id']) => {   
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`,product, {
                headers: {
                    'Content-Type': 'multipart/form-data' //para procesar archivos
                }
            })
            navigate('/')
            await mutate()
        } catch (error) {
            const err = error as AxiosError
                console.log(err.response?.data)
        }
    }

    const updateAvailability = async ( id : Product['id']) => { 
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            await mutate()
        } catch (error) {
            const err = error as AxiosError
                console.log(err.response?.data)
        }
        
    }

    const deleteProduct = async ( id : Product['id']) => { 
        const res = confirm('¿seguro que quieres eliminar este producto?')
        if (res) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
                navigate('/')
                await mutate()
            } catch (error) {
                const err = error as AxiosError
                    console.log(err.response?.data)
            }
        }
    }

    const addCategory = async (category: DraftCategory) => { 
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/products/categories`, category )
            getCategories()
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories= async () => { 
        try {
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/products/categories`)
            setCategorias(data.data)
            
        } catch (error) {
            console.log(error);
        }
    } 

    const deleteCategory = async ( id : Category['id']) => { 
        const res = confirm('¿seguro que quieres eliminar esta categora?')
        if (res) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/categories/${id}`)
                getCategories()
            } catch (error) {
                const err = error as AxiosError
                    console.log(err.response?.data)
            }
        }
    }


    const createOrder = async ( idUser: User['id'],carrito : Cart[], totalOrder: number) => { 
        const carWithId = {
            userId : idUser,
            products:carrito,
            totalOrder
        }
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/products/order`, carWithId)
            setCart([])
        } catch (error) {
            const err = error as AxiosError
                console.log(err.response?.data)
        }
        
    }

    const getOrders = async () => { 
        
        try {
            const data = await axios(`${import.meta.env.VITE_API_URL}/api/products/order`)
            setOrders(data.data.data);
            
        } catch (error) {
            const err = error as AxiosError
                console.log(err.response?.data)
        }
        
    }

    const completeOrder = async ( id : Order['id']) => { 
        updateProductQuantity(id)
        
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/order/${id}`)
        } catch (error) {
            const err = error as AxiosError
                console.log(err.response?.data)
        }
        
    }
    
    const updateProductQuantity = async (orderId : Order['id'])=>{
        const order = orders.filter(i=> i.id == orderId)[0]
        const products = order.products.filter(i => i.id )

        for(const i of products){
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/products/quantity/${i.id}`,{quantity:i.quantity})
            } catch (error) {
                const err = error as AxiosError
                    console.log(err.response?.data)
            }
        }
        
        
    }

    


    return {
        addProduct,
        isLoading,
        mutate,
        productos,
        getProductById,
        editProduct,
        updateAvailability,
        deleteProduct, 
        getCategories,
        addCategory,
        deleteCategory,
        createOrder,
        getOrders,
        completeOrder
        
    }
}
