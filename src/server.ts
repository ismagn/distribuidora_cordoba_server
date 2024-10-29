import express from 'express'
import productRouter from './routers/productRouter'
import db from './config/db'
import cors, {CorsOptions} from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter'

dotenv.config()

    //conectar a base de datos
    async function connectDB(){
        try{
            await db.authenticate()
            db.sync()
            console.log('conexion exitosa a la base de datos')
        }catch (error) {
            console.log(error)
            console.log('hubo un error al conectar a la db')
        }
    }
    connectDB()

    
    const server = express()

    //permitir conexiones al frontend (especificos)
    const corsOptions:CorsOptions = {
        origin: function(origin, callback) {
            if (origin === process.env.CLIENT_URL) { 
                callback(null,true)
            }else{
                callback(new Error('Error de CORS'))
            }
        }
    }
    server.use(cors())


    //leer datos de formularios
    server.use(express.json())

    //routing
    server.use('/uploads', express.static( 'uploads'));
    server.use('/api/products', productRouter)
    server.use('/api/users', userRouter)

    export default server