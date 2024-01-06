import Link from "next/link"
import Cart from "./Cart"

const Header = () => {
  return (
    <header className='w-full fixed top-0 bg-[#f6f4f2] z-[9000]'>
      <div className="bg-greenw w-full h-8 flex items-center justify-center text-white font-medium text-base md:text-lg">
        Envíos sin costo para la zona de Tigre 🛵
      </div>
      <div className="mx-auto max-w-5xl w-full h-20 md:h-28 flex items-center justify-between px-4">
        <div className="text-center ">
          <Link href='/' className="">
            {/* <Image src={imgLogo} width={300} height={300} alt="logo dalone" className="w-auto h-14 md:w-full md:h-16" /> */}
            <h1 className="text-main font-bold text-3xl tracking-tighter -mb-2">Dalone<span className="text-greenw font-bold text-4xl">.</span></h1>
            <span className="uppercase text-xs text-greenw tracking-widest font-medium">Bocados artesanales</span>
          </Link>
        </div>
        <Cart />
      </div>
    </header>
  )
}

export default Header