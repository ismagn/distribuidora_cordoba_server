import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SlideHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: false,
    pauseOnHover: true
  };
  return (
    <div className=" md:py-10 md:px-20 bg-white m-2  ">
        <Slider {...settings} >
      <div className="">
        <img className=" w-full h-52 md:h-96" src="../public/img/distribuidora_vista1.jpg" alt="" />
      </div>
      <div className="  ">
      <img className=" w-full h-52 md:h-96" src="../public/img/distribuidora_vista2.jpg" alt=""  />
      </div>
      <div className=" ">
      <img className=" w-full  h-52 md:h-96" src="../public/img/distribuidora_vista3.jpg" alt="" />
      </div>
      <div>
      <img className=" w-full h-52 md:h-96" src="../public/img/distribuidora_vista4.jpg" alt="" />
      </div>
      <div>
      <img className=" w-full h-52 md:h-96" src="../public/img/distribuidora_vista5.jpg" alt="" />
      </div>
      <div className=" "> 
        <img className=" w-full h-52 md:h-96" src="../public/img/vista_interior1.jpg" alt="" />
      </div>
    </Slider>
    
    </div>
  );
}