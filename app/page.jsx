import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import How from '@/components/How'
import Products from '@/components/Products'
import { CartProvider } from '@/context/cart'

export default function Home() {
  
  return (
    <CartProvider>
      <Header />
      <Banner />
      <How />
      <Products />
    </CartProvider>
  )
}