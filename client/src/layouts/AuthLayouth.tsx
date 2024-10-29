import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function AuthLayouth() {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <div>
            <Header/>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
