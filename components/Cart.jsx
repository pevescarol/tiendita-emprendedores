'use client'

import Image from 'next/image'
import React, { useId, useMemo, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { parseCurrency } from '@/utils/currency'
import { BsCart3, BsWhatsapp, BsX, BsArrowRight } from 'react-icons/bs'

function CartItem ({image, price, title, quantity, addToCart, decreaseQuantity, removeFromCart}) {
  
  return (
    <li className='rounded-xl bg-white my-4 p-4 flex w-full justify-between'>
      <div className='flex gap-2'>
        <Image src={image} alt='foto producto' width={200} height={200} className='aspect-video w-24 object-cover rounded-lg' />
        <div className='flex flex-col justify-between items-sta'>
          <p className='font-semibold'>{title}</p>
          <p className='text-sm text-slate-600'>{parseCurrency(price * quantity)}</p>
        </div>
      </div>

      <div className='flex flex-col items-end justify-between gap-2'>
        <div className='cursor-pointer' onClick={removeFromCart}><BsX /> </div>
        <div className='flex flex-row items-center gap-2'>
          <button onClick={decreaseQuantity} className='text-[#40aa54] font-bold'>-</button>
          <small className='text-slate-600'>
            {quantity}
          </small>
          <button className='text-[#40aa54] font-bold' onClick={addToCart}>+</button>
        </div>
      </div>
    </li>
  )
}

const Cart = () => {
  const [ cartOpen, setCartOpen ] = useState(false)
  
  const { cart, clearCart, addToCart, decreaseQuantity, removeFromCart } = useCart()

  const text = useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* *${product.quantity} x ${product.title}* - ${parseCurrency(product.price * product.quantity)}\n`), ``)
      .concat(`\n*Total: ${parseCurrency(cart.reduce((total, product) => total + (product.price * product.quantity), 0))}*`)
  }, [cart])

  return (
    <div className=''>
      <button 
        className='flex items-center bg-[#e8f7eb] rounded-full cursor-pointer w-16 h-10 justify-center p-1 relative transition-all duration-300 ease-in-out hover:scale-110' 
        onClick={() => setCartOpen(!cartOpen)}
      >
        <BsCart3 className='text-[#40aa54] text-xl' />
        {(cart.length > 0) ? <div className='text-black bg-amber-300 rounded-full text-[10px] items-center flex justify-center absolute -left-2 top-1 text-center font-bold w-5 h-5'>{(cart.length > 0) ? (cart.reduce((total, product) => (total  + product.quantity), 0)) : ''}</div> : ''}
      </button>

      <aside className={`${cartOpen ? 'block' : 'hidden'} bg-[#e8f7eb] px-7 py-16 absolute h-screen right-0 top-0 w-full md:w-96 overflow-scroll`}>
        <div>
          <button onClick={() => setCartOpen(false)} className='cart-button flex gap-2 items-center text-md text-black font-semibold cursor-pointer' >Volver <BsArrowRight className='font-bold text-xl' /> </button>
        </div>
        <ul className=''>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                decreaseQuantity = {() => decreaseQuantity(product)}
                removeFromCart = {() => removeFromCart(product)}
                {...product}
              />
            ))
          }
        </ul>

        {(cart.length > 0) ? <div className='flex flex-col gap-y-3'>
          <button className='py-2 px-3 rounded-xl bg-[#40aa54] text-white hover:bg-white hover:text-[#40aa54]'>
            {(cart.length > 0) && (
            <Link 
              href={`https://wa.me/5491138752984?text=${encodeURIComponent(text)}`} 
              target='_blank' 
              className='flex items-center justify-center gap-3 font-bold'
            >
              Completar pedido <BsWhatsapp  />
            </Link>)}
          </button>

          <button 
            className='text-slate-600 text-sm font-semibold hover:underline'
            onClick={clearCart}>
            Vaciar carrito
          </button>
        </div> : <div className='flex items-center justify-center h-full'>Carrito Vacío</div>}
        
      </aside>
    </div>
  )
}

export default Cart