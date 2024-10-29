import { Request, Response} from 'express'
import {check, validationResult, param} from 'express-validator'
import User from '../models/User'
import generarJWT from '../helpers/generarJWT';

type AuthRequest = Request & { 
    userId: number 
};


export const register = async (req : Request , res : Response) => {

    await check('name').notEmpty().withMessage('El nombre de producto no puede ir vacio').run(req)
    await check('email').notEmpty().withMessage('El correo no puede ir vacio').run(req)
    await check('password').notEmpty().withMessage('El password no puede ir vacio').run(req)
                        
    let errors = validationResult(req) 
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    
    try{
        const user = await User.create(req.body) 
        res.json({data: user, msj: 'REGISTRADO CORRECTAMENTE'}) 
        
    } catch(error) {
        console.log(error)
    }
}

export const login = async (req : Request , res : Response) => {

    
    
    const phone = req.body.phone
    const password = req.body.password

    
    try{
        const user = await User.findOne({
            where: {
                phone: phone
            },
        })

        if(!user){
            return res.status(404).json('usuario no encontrado'
            )
        }

        const isMatch = user.validPassword(password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({data: user, token: generarJWT(user.id), msj: 'INICIANDO SESION'})

    }catch(error){
        console.log(error)
    }
}




export const perfil = async (req : AuthRequest , res : Response) => {
    try {
    const userId = req.userId

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
        res.json(user.dataValues);
    
    }catch (error) {
        console.log(error);
    }
}


export const updatePerfil = async (req : Request, res : Response) => {
    await param('id').isInt().withMessage('Id no valido').run(req)
    
                let errors = validationResult(req)
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }
    
    const {id} = req.params
    const user = await User.findByPk(id)
    

    if(!User){
        return res.status(404).json({
            error: 'usuario no encontrado'
        })
    }

    
    await user.update(req.body)
    
    
    await user.save()
    
    res.json( {data: 'usuario actualizado'})
}