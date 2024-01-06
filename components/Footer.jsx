import Link from 'next/link'
import { BsInstagram, BsFacebook } from 'react-icons/bs'

const Footer = () => {
  
  return (
    <footer className="bg-grayback text-main mt-16 relative bottom-0">
      <div className="mx-auto max-w-5xl w-full flex items-center justify-between text-center flex-col md:flex-row px-6 py-8 md:py-10 gap-y-12">
        <div className='flex items-center flex-col gap-3 h-full'>
          <Link href='/'>
            <h1 className="text-main font-bold text-xl tracking-tighter -mb-2">Dalone<span className="text-greenw font-bold text-2xl">.</span></h1>
            <span className="uppercase text-[10px] text-greenw tracking-widest font-medium">Bocados artesanales</span>
          </Link>
          <div className='flex items-center gap-4'>
            <Link href='/' className='text-xl'><BsInstagram /></Link>
            <Link href='/' className='text-xl'><BsFacebook /></Link>
          </div>
        </div>
        <div>
          Todos los derechos reservados <br className='block md:hidden ' />©2024 - CP.
        </div>
      </div>
    </footer>
  )
}

export default Footer