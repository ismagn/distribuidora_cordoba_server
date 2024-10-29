import { Request, Response} from 'express'
import {check, validationResult, param} from 'express-validator'
import Product  from '../models/Porduct'
import fs from 'node:fs'
import path from 'path'
import CategoryProduct from '../models/CategoryProduct'
import User from '../models/User'
import Order from '../models/Order'


        export const createProduct = async (req : Request , res : Response) => {            
                
            const { name, price, availability, description, categoryId, cuantity,  } = req.body;
            const image = req.file ? req.file.path : null;
            
                

                await check('name').notEmpty().withMessage('El nombre de producto no puede ir vacio').run(req)
                await check('price')
                        .isNumeric().withMessage('valor no valido')
                        .notEmpty().withMessage('El precio no puede ir vacio')
                        .custom( value => value > 0).withMessage('precio no valido') 
                        .run(req)
                
                let errors = validationResult(req) 
                
                
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }
                
                try{
                    const product = await Product.create({ 
                        name, 
                        price, 
                        availability,
                        description,
                        categoryId ,
                        cuantity, 
                        image }) 

                    res.json({data: product}) 
                    
                } catch(error) {
                    console.log(error)
                }
            }
        
            export const getProducts = async (req : Request, res : Response) => {
                try{
                    const products = await Product.findAll({
                        // where: {
                        //     availability: true,  
                        // },
                        order: [
                            ['id', 'ASC']  
                        ],
                        
                        attributes: {exclude: ['createdAt', 'updatedAt']}, 
                        include: [{
                            model: CategoryProduct,
                            attributes: ['name']
                        }]
                    })
                    
                    
                    res.json({data: products})
                }catch(error){
                    console.log(error)
                }
            }

            export const getImages = async (req: Request , res: Response) =>{
                const uploadsDir = path.join(__dirname, 'uploads');
                    fs.readdir(uploadsDir, (err, files) => {
                        if (err) {
                            return res.status(500).json({ message: 'Unable to scan files!' });
                        }

                        res.json({data: files})
                    });
            } 

            export const getProductById = async (req : Request, res : Response) => {
    
                try{
                    const {id} = req.params
                    
                    
                    const product = await Product.findByPk(id,{
                        include: [{
                            model: CategoryProduct,
                            attributes: ['name']
                        }]
                    })
    
                    if(!product){
                        return res.status(404).json({
                            error: 'producto no encontrado'
                        })
                    }
                    res.json({data: product})
                }catch(error){
                    console.log(error)
                }
            }

            export const updateProduct = async (req : Request, res : Response) => {
                
    
                let errors = validationResult(req) 

                const {id} = req.params
                const product = await Product.findByPk(id)
                const previousImage = product.dataValues.image
        
                if(!product){
                    return res.status(404).json({
                        error: 'producto no encontrado'
                    })
                }

                if (req.body.cuantity == 0 && req.body.availability =='true') {
                    return res.status(404).json({
                        error: 'ingresa una cantidad al producto para que pueda estar disponible'
                    })
                }
    
                await check('name').notEmpty().withMessage('El nombre de producto no puede ir vacio').run(req)
                await check('price')
                        .isNumeric().withMessage('valor no valido')
                        .notEmpty().withMessage('El precio no puede ir vacio')
                        .custom( value => value > 0).withMessage('precio no valido') 
                        .run(req)
                await check('availability').isBoolean().withMessage('valor para disponibilidad no valido').run(req)
                
                errors = validationResult(req) 
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }

                
                
                if (req.file) {
                    await product.update({image: req.file.path})
                        
                    if (previousImage) {
                            fs.unlinkSync(previousImage); 
                        }

                }

                    await product.update(req.body)
                
                    await product.save()
                

                res.json({data: 'prodcuto actualizado'})
            }
    
            
        
    
        export const updateAvailability = async (req : Request, res : Response) => {

                const {id} = req.params
                
                const product = await Product.findByPk(id)
                
                if(!product){
                    return res.status(404).json({
                        error: 'producto no encontrado'
                    })
                }
                
                product.update({ availability: !product.dataValues.availability})
                await product.save()
            }

        export const updateProductQuantity = async (req : Request, res : Response) => {
                
    
                const {id} = req.params
                const {quantity} = req.body
                const product = await Product.findByPk(id)
                let newCuantity = 0
                
        
                if(!product){
                    return res.status(404).json({
                        error: 'producto no encontrado'
                    })
                }

                if (quantity>=product.dataValues.cuantity ) {
                    newCuantity=0
                } else {
                    newCuantity = product.dataValues.cuantity - quantity
                }
                
                
                
                await product.update({cuantity:newCuantity})
                
                if (product.dataValues.cuantity == 0) {
                    await product.update({availability: false})
                }
                
                await product.save()
                
                res.json({data: 'prodcuto actualizado'})
            }

        export const deleteProduct = async (req : Request, res : Response) => {
                

        
                const {id} = req.params
                const product = await Product.findByPk(id)

                if(!product){
                    return res.status(404).json({
                        error: 'producto no encontrado'
                    })
                }
                    if (product.dataValues.image) {
                        const imagePath =  product.dataValues.image;
                        fs.unlinkSync(imagePath); 
                    }
                    
                

                await product.destroy()
                
                res.json({data: 'producto eliminado'})

        }
        
        export const createCategories = async (req : Request, res : Response) => {
            const { name } = req.body;
            
        
            await check('name').notEmpty().withMessage('El nombre de la categoria no puede ir vacio').run(req)
            
            
            let errors = validationResult(req) 
            
            

            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            
            try{
                const category = await CategoryProduct.create({ 
                    name
                    }) 
                res.json({data: category}) 
                
            } catch(error) {
                console.log(error)
            }
        }


        export const getCategories = async (req : Request, res : Response) => {
            try{
                const categories = await CategoryProduct.findAll({
                    
                    order: [
                        ['id', 'ASC']  
                    ],

                    attributes: {exclude: ['createdAt', 'updatedAt']}, 

                    include: [{
                        model: Product
                    }]
                })
                
                
                res.json({data: categories})
            }catch(error){
                console.log(error)
            }
        }


        export const deleteCategory = async (req : Request, res : Response) => {

            await param('id').isInt().withMessage('Id no valido').run(req)

            let errors = validationResult(req) 


            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const {id} = req.params
            const category = await CategoryProduct.findByPk(id)

            if(!category){
                return res.status(404).json({
                    error: 'categoria no encontrada'
                })
            }

            await category.destroy()
            
            res.json({data: 'categoria eliminado'})
        }


        export const createOrder = async (req : Request , res : Response) => {            
                
            
            const {userId, products, totalOrder} = req.body
            
                
                try{
                    const order = await Order.create({ 
                        userId,
                        products,
                        totalOrder
                    }) 
                    
                    res.json({data: order}) 
                    
                } catch(error) {
                    console.log(error)
                }
            }

            export const getOrders = async (req : Request , res : Response) => {            
                
                try{
                    const orders = await Order.findAll({
                        
                        order: [
                            ['id', 'ASC']  
                        ],
    
                        attributes: {exclude: [ 'updatedAt', 'userId']}, 
    
                        include: [{
                            model: User
                        }]
                    })
                    
                    
                    res.json({data: orders})
                }catch(error){
                    console.log(error)
                }
                }


        export const completeOrder = async (req : Request, res : Response) => {
                

                await param('id').isInt().withMessage('Id no valido').run(req)
            
                let errors = validationResult(req) 

                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }
            
                        
                const {id} = req.params
                        
                const order = await Order.findByPk(id)
                        
                if(!order){
                    return res.status(404).json({
                        error: 'orden no encontrado'
                })
                }
            

                if (order.dataValues.state == 0) {
                    order.update({ state: 1})
                }else{
                    order.update({ state: 0})
                }

                await order.save()
                        
                        
                    }