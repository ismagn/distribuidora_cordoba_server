import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SlideHome from "../components/SlideHome"


function Home() {

  useAuth('guest')

  return (
    <div className=" m-2 ">
      <header className="">
            <SlideHome/>
            
      </header>
      <section className="mx-2 mt-10 bg-white rounded-md p-2 md:p-8 shadow-lg">
          <p className=" text-gray-400 md:text-2xl font-bold text-center ">Comprometidos a brindarle la mejor solución, productos de la mejor calidad, precio adecuado, con mano de obra calificada</p>
          <div  className=" text-center my-4 md:my-10 ">
              <Link to={'products'} className=" p-2 md:p-4 bg-black text-white shadow-xl md:text-3xl rounded-md font-bold">PRODUCTOS</Link>
            </div>
      </section>
      <section className=" bg-gray-500 my-5 md:my-10 shadow-lg mx-2 rounded-md p-8 text-center uppercase">
        <p className=" md:text-2xl text-white font-bold">Somos distribuidor autorizado de las mejores marcas</p>
      </section>
      <section className="  grid grid-cols-4 p-4 gap-1 md:gap-10 my-5 items-center bg-white shadow-xl mx-2">
          <img src="../public/img/marcas/3m.jpg" alt="" />
          <img src="../public/img/marcas/condulac.png" alt="" />
          <img src="../public/img/marcas/condumex.jpg" alt="" />
          <img src="../public/img/marcas/fierro.jpg" alt="" />
          <img src="../public/img/marcas/poliflex.png" alt="" />
          <img src="../public/img/marcas/tecnolite.png" alt="" />
          <img src="../public/img/marcas/viakon.jpg" alt="" />
          <img src="../public/img/marcas/volteck.png" alt="" />
      </section>
    </div>
  )
}

export default Home
