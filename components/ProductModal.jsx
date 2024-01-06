import Image from 'next/image'
import React from 'react'
import { BsX } from 'react-icons/bs'
import { parseCurrency } from '@/utils/currency'

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed z-[9999] inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 max-w-md w-full rounded-lg shadow-lg">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <BsX className='text-3xl' />
          </button>
        </div>
        <div className="my-4">
          <Image src={product.image} alt={product.title} width={300} height={200} className="w-full h-full" />
        </div>
        <p className=''>{product.description}</p>
        <p className="text-lg font-semibold mt-4">{parseCurrency(product.price)}</p>
      </div>
    </div>
  )
}

export default ProductModal