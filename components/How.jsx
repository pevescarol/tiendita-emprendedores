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
      description: '¡Listo! Continuaremos con tu pedido a través de WhatsApp, y te ayudaremos para coordinar entrega y pago.',
      image: '',
    }
  ]

  return (
    <section className='max-w-5xl mx-auto px-4 py-12'>
      {/* items */}
      <div className='grid md:grid-cols-3 grid-cols-1 md:w-11/12 mx-auto gap-2 '>
        {pasos.map(paso => (
          <div key={paso.id} className=' py-4 text-center lg:text-start mx-auto flex flex-col lg:flex-row items-center h-full '>
            <div className='w-[30%] mb-3 mx-auto flex items-center justify-center'>
              <h3 className='text-[#40aa54] text-4xl md:text-6xl font-bold '>{paso.title}</h3>
            </div>
            <div className='px-2 w-[70%]'>
              <p className='text-sm text-slate-500'>{paso.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default How