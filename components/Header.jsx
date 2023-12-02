import Link from "next/link"
import Cart from "./Cart"
import Image from "next/image"
import imgLogo from '../public/mitienda.jpg'

const Header = () => {
  return (
    <header className='w-full fixed top-0 bg-white z-[9999]'>
      <div className="mx-auto max-w-5xl w-full h-20 md:h-28 flex items-center justify-between pl-2 pr-4 md:p-0">
        <div>
          <Link href='/'>
            <Image src={imgLogo} width={300} height={300} alt="logo dalone" className="w-[140px] md:w-full h-20" />
          </Link>
        </div>
        <Cart />
      </div>
    </header>
  )
}

export default Header