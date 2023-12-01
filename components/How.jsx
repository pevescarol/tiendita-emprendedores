import Image from 'next/image'
import React from 'react'

const How = () => {

  const pasos = [
    {
      id: 1,
      title: '1',
      description: 'Elige tus productos preferidos.',
      image: '',
    },
    {
      id: 2,
      title: '2',
      description: 'Revisa tu carrito y haz click en completar tu pedido.',
      image: '',
    },
    {
      id: 3,
      title: '3',
      description: '¡Listo! Continuaremos con tu pedido a través de WhatsApp, y te ayudaremos para coordinar envío y pago.',
      image: '',
    }
  ]

  return (
    <div className='max-w-4xl mx-auto px-4 md:px-14 py-16'>
      <div className="md:w-1/2 mx-auto text-center">
        <h2 className='text-lg text-slate-600 font-semibold mb-3'>Cómo realizar tu pedido:</h2>
      </div>
      {/* items */}
      <div className='mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-4 '>
        {pasos.map(paso => (
          <div key={paso.id} className='py-8 text-center md:w-[200px] mx-auto rounded-md flex items-stretch justify-center h-full '>
            <div>
              <div className='bg-[#e8f7eb] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl flex items-center justify-center'>
                {/* <Image src={paso.image} alt='' className='-ml-5' /> */}
                <h4 className='text-[#40aa54] text-xl font-bold'>{paso.title}</h4>
              </div>
              <p className='text-sm text-slate-500'>{paso.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default How