import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User";


type AuthRequest = Request & { 
    userId: {}
};

type decoded = {
    id : number
    iat: number
    exp: number
}

const checKAuth = async (req : AuthRequest,res: Response,next: NextFunction)=>{
    let token = "";
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]//el split borra la primera cadena en este caso la palabra 'Bearer' y asigna el otro valor a la variable

            const decoded = jwt.verify(token, process.env.JWT_SECRET) as decoded; //verify decifra el token enviado desde el rontend
            req.userId = decoded.id
            
            return next()
        } catch (error) {
            return res.status(404).json({msg : "hubo un error"})
        }
    } 

    if (!token) {
        const error = new Error("token no valido")
        return res.status(401).json({msg: error.message})
    }

    next()
}

export default checKAuth;