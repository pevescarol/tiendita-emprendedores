'use client'

import Image from 'next/image'
import React, { useId, useMemo } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { parseCurrency } from '@/utils/currency'
import { BsCart3 } from 'react-icons/bs'

function CartItem ({image, price, title, quantity, addToCart, decreaseQuantity}) {
  
  return (
    <li className='border-b border-[#444] pb-4'>
      <Image src={image} alt='foto producto' width={100} height={100} className='aspect-video w-full object-cover' />
      <div>
        <p>{title} - {parseCurrency(price * quantity)}</p>
      </div>

      <div className='flex gap-2 justify-center items-center'>
        <button onClick={decreaseQuantity}>-</button>
        <small>
          {quantity}
        </small>
        <button className='p-2' onClick={addToCart}> + </button>
      </div>
    </li>
  )
}

const Cart = () => {

  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, decreaseQuantity } = useCart()

  const text = useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.quantity} x ${product.title} - ${parseCurrency(product.price * product.quantity)}\n`), ``)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + (product.price * product.quantity), 0))}`)
  }, [cart])
  
  return (
    <div>
      <label 
        className='cart-button flex items-center bg-[#284145] rounded-full cursor-pointer w-16 h-10 justify-center p-1 relative transition-all duration-300 ease-in-out z-[9999] hover:scale-110' 
        htmlFor={cartCheckboxId}
      >
        <BsCart3 className='text-white text-xl' />
        {(cart.length > 0) ? <div className='text-black bg-amber-300 rounded-full text-[10px] items-center flex justify-center absolute -left-2 top-1 text-center font-bold w-5 h-5'>{(cart.length > 0) ? (cart.reduce((total, product) => (total  + product.quantity), 0)) : ''}</div> : ''}
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className='cart bg-black hidden p-8 fixed h-screen right-0 top-0 w-[200px] text-white'>
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                decreaseQuantity = {() => decreaseQuantity(product)}
                {...product}
              />
            ))
          }
        </ul>

        <button onClick={clearCart}>
          Limpiar carrito
        </button>

        <button>
          {(cart.length > 0) && (
          <Link href={`https://wa.me/5491138752984?text=${encodeURIComponent(text)}`} target='_blank'>
            Completar pedido
          </Link>)}
        </button>
        
      </aside>
    </div>
  )
}

export default Cart