'use client'

import Image from 'next/image'
import React, { useId, useMemo } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { parseCurrency } from '@/utils/currency'

function CartItem ({image, price, title, quantity, addToCart}) {
  
  return (
    <li className='border-b border-[#444] pb-4'>
      <Image src={image} alt='foto producto' width={100} height={100} className='aspect-video w-full object-cover' />
      <div>
        <p>{title} - {parseCurrency(price * quantity)}
</p>
      </div>

      <div className='flex gap-2 justify-center items-center'>
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
  const { cart, clearCart, addToCart } = useCart()

  const text = useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price * product.quantity)}\n`), ``)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + (product.price * product.quantity), 0))}`)
  }, [cart])
  
  return (
    <>
      <label 
        className='cart-button flex items-center bg-[#09f] rounded-full cursor-pointer h-8 justify-center p-1 absolute right-2 top-2 transition-all duration-300 ease-in-out w-8 z-[9999] hover:scale-110' 
        htmlFor={cartCheckboxId}
      >
        C
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className='cart bg-black hidden p-8 fixed right-0 top-0 w-[200px] text-white'>
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
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
    </>
  )
}

export default Cart