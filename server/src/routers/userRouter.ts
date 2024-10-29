import {Router} from 'express'
import { login, perfil, register, updatePerfil } from '../controllers/userController'
import checKAuth from '../middleware/checkAuth'

const userRouter = Router()

userRouter.post('/login',login)
userRouter.post('/register' , register)
userRouter.get('/perfil', checKAuth, perfil)
userRouter.put('/update-perfil/:id', updatePerfil)


export default userRouter