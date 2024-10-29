import { Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"



export default function Orders() {
    
  useAuth('admin')

  return (
    
    <div className=" h-screen">
        <Outlet/>
    </div>
  )
}
