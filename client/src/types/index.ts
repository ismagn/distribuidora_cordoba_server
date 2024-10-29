
export type draftProduct = {
    name: string
    price: number
    cuantity: number
    categoryId: number
    description: string
    availability: boolean
    image : File | null | string
}

export type Product = draftProduct & {
    id: string
    category: {name:string}
    
}

export type DraftCategory = {
    name: string
}


export type Category = DraftCategory & {
    id: number
    
}

export type draftUserAuth = {
    phone: number | undefined
    password: string | undefined
    
}

export type draftUser = draftUserAuth & {
    name: string | undefined
    email: string | undefined
    adress: string | undefined
}

export type User = draftUser &{
    id: number | undefined
    admin: boolean
}

export type Cart = {
    id: string
    name: string
    price: number
    total: number
    quantity: number
    image : File | null | string
}



export type Order = {
    id: number
    products: Cart[]
    user: User
    totalOrder: number
    state: number
    createdAt: string
} 

export type Alert = {
    message:  unknown | string
    error: boolean
}

export type ContextProps = {
    productos: Product[]
    setProductos: React.Dispatch<React.SetStateAction<Product[]>>
    producto: Product
    setProducto: React.Dispatch<React.SetStateAction<Product | undefined>>
    categorias: Category[]
    setCategorias: React.Dispatch<React.SetStateAction<Category | undefined>>
    cart: Cart[]
    setCart: React.Dispatch<React.SetStateAction<Cart[] | undefined>>
    orders: Order[]
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
    activeUser: User
    setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>
    alert : Alert
    setAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>
    addProduct:(product: Product) => Promise<void>
    getProducts: () => Promise<void>
}
