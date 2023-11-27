import Cart from '@/components/Cart'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Products from '@/components/Products'
import { CartProvider } from '@/context/cart'

export default function Home() {
  
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products />
    </CartProvider>
  )
}