

export default function Footer() {
  return (
    <div className="  md:my-20 bg-black text-white grid grid-cols-1 md:grid-cols-2 p-10 items-center">
        <div>
            <h2 className=" font-bold text-lg">CONTACTANOS</h2>

            <ul className=" my-8 flex flex-col gap-3">
                <li>- <a href="https://wa.me/2299281516" target="_blank">271 712 0127</a></li>
                <li>- aloyorangel@hotmail.com</li>
                <li>- calle 15 #317-A, Córdoba, Mexico</li>
            </ul>
        </div>
        <div>
            <img src="../public/img/banner_distribuidora_cordoba.jpg" alt="" />
        </div>
    </div>
  )
}
