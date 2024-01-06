import Image from 'next/image'
import banner2Img from '../public/banner-2.jpg'

const Banner = () => {
  return (
    <section className='max-w-5xl w-full mx-auto lg:rounded-2xl mt-20 md:mt-28 bg-[#e8f7eb] h-[250px] md:h-[350px]'>
      <Image src={banner2Img} alt='banner' loading='lazy' width={2000} height={2000} 
          className='w-full h-full lg:rounded-2xl object-cover'
      />
    </section>
  )
}

export default Banner