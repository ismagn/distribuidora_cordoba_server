import { createContext, ReactNode, useState} from "react"
import { Alert, Cart, Category, Order, Product } from "../types";

type ProductosProviderProps = {
    children: ReactNode
}

const ProductosContext = createContext({});

const ProductosProvider = ({children} : ProductosProviderProps) => {

    const [productos, setProductos] = useState<Product[]>([])
    const [producto, setProducto] = useState<Product>()
    const [categorias, setCategorias] = useState<Category>()
    const [cart, setCart] = useState<Cart[]>([]) 
    const [orders, setOrders] = useState<Order[]>([])
    const [alert,setAlert] = useState<Alert>() 
    

    
    
    return (
        <ProductosContext.Provider
            value={{
                setProductos,
                productos,
                producto,
                setProducto,
                setCategorias,
                categorias, 
                cart,
                setCart,
                setOrders,
                orders,
                alert,
                setAlert
            
            }}
        >{children}</ProductosContext.Provider>
    )
}

export {
    ProductosProvider
}
export default ProductosContext