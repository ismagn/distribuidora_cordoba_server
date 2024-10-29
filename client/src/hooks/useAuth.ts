
import axios, { AxiosError } from "axios";
import type { ContextProps, User, draftUser, draftUserAuth } from '../types';
import useProductos from "./useProductos";
import useSWR from "swr";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";



export const useAuth = (middleware : string) => {

    const token = localStorage.getItem('DISTRIBUIDORA-TOKEN')
    const {setActiveUser, setAlert} = useProductos() as ContextProps
    const navigate = useNavigate()
    
    

    const {data: user, mutate: mutateUser, isLoading: isLoadingUser} = useSWR<User>(`${import.meta.env.VITE_API_URL}/api/users/perfil`, ()=>
        axios(`${import.meta.env.VITE_API_URL}/api/users/perfil`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error =>{
            throw Error(error?.response?.data?.errors)
        })
    )
    

    const addUser = async (user : draftUser) => { 
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, user )
            navigate('/auth')
        
        } catch (error) {
            const err = error as AxiosError
            setAlert({message: err.response?.data, error: true})
        }
    }

    const editUser = async (dataUser : draftUser , id : User['id']) => { 
        
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/update-perfil/${id}`,dataUser)
            setAlert({message: data.data , error: false})
            
            await mutateUser()
        } catch (error) {
            const err = error as AxiosError
            setAlert({message: err.response?.data, error: true})
                
        }

        setTimeout(()=>{

            setAlert({message: "", error: true})
        },3000)
    }

    const login = async (user: draftUserAuth) => { 
        
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, user )
            console.log(data.msj,"ppp");
            setAlert({message: data.msj , error: false})
            
            localStorage.setItem('DISTRIBUIDORA-TOKEN', data.token)
            mutateUser()
            
            
            setTimeout(()=>{

                setActiveUser(data.data)
            },2000)
            
            
        } catch (error) {
            const err = error as AxiosError
                setAlert({message: err.response?.data, error: true})
        }

        setTimeout(()=>{

            setAlert({message: "", error: true})
        },5000)
    }

    const logout = () => {
        const res = confirm("¿Seguro que quieres cerrar session?")
        if (res) {
            localStorage.removeItem('DISTRIBUIDORA-TOKEN')
            window.location.reload()
        }
        mutateUser()
    }


    useEffect(()=>{
        if (user && middleware=='login') {
            navigate('/')
        }

        if (!user && middleware == 'admin' || !user && middleware == 'perfil') {
            navigate('/auth')
        }

        

        if (!user && middleware=='register') {
            navigate('/auth/register')
        }
    },[user])


    return {
        addUser,
        editUser,
        login,
        logout,
        isLoadingUser,
        user,
        mutateUser
        
    }
}