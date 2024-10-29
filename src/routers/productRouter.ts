import {Router} from 'express'

import { completeOrder, createCategories, createOrder, createProduct, deleteCategory, deleteProduct, getCategories, getOrders, getProductById, getProducts, updateAvailability, updateProduct, updateProductQuantity} from '../controllers/productController';
import multer from 'multer';



    const productRouter = Router()

    const upload = multer({dest: 'uploads/'})
    
    //routing

    productRouter.post('/order', createOrder)

    productRouter.get('/order', getOrders)
    
    productRouter.patch('/order/:id', completeOrder)



    productRouter.get('/categories', getCategories)

    productRouter.post('/categories', createCategories)

    productRouter.delete('/categories/:id', deleteCategory)
    
    
    
    productRouter.post('/', upload.single('image') ,createProduct)
    
    productRouter.get('/', getProducts)

    productRouter.get('/:id', getProductById)
    
    productRouter.put('/:id' , upload.single('image'), updateProduct)

    productRouter.put('/quantity/:id' , updateProductQuantity)

    productRouter.patch('/:id', updateAvailability)

    productRouter.delete('/:id', deleteProduct)


    export default productRouter