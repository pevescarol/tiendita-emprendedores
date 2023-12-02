'use client'

import { useState, useEffect } from 'react';
import { fetchProducts } from '@/utils/api'; // Importa la función fetchProducts de la carpeta api
import Image from 'next/image';
import Filters from './Filters';
import { useCart } from '@/hooks/useCart';
import { parseCurrency } from '@/utils/currency';
import { BsCart3, BsTrash } from 'react-icons/bs'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
  });
  const { addToCart, removeFromCart, cart } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts(); // función fetchProducts para obtener los datos
        setProducts(productsData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products: ', error)
      }

    };

    fetchData();
    
  }, []);

  // Filtrar productos
  const filterProducts = (products) => {
    return products.filter(product => {
      return filters.category === 'all' || product.category === filters.category;
    });
  };

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const filteredProducts = filterProducts(products);


  return (
    <main className='flex flex-col items-center justify-center max-w-5xl mx-auto '>
      {/* Filtrar productos */}
      <Filters filters={filters} setFilters={setFilters} />
      {/* Productos */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 mt-16 px-8 items-center">
        {loading ? (
          // si el loading es true
          <div className="col-span-2 flex flex-col gap-4 items-center justify-center">
            {/* loading de carga */}
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-emerald-500"></div>
            <p className="ml-4 text-emerald-600 font-semibold">Cargando productos...</p>
          </div>
        ) : (
          // si el loading es false
          filteredProducts.map(product => {
            const isProductInCart = checkProductInCart(product)
    
            return (
              <li key={product.id} className="flex h-[450px] w-[320px] flex-col overflow-hidden bg-[#e8f7eb] rounded-2xl drop-shadow-md md:h-[250px] md:w-full md:flex-row">
                {/* item del producto */}
                <div className='h-[240px] md:h-full md:w-[250px] bg-slate-400'>
                  <Image src={product.image} alt={product.title} width={300} height={300} className="object-cover h-full w-full " />
                </div>
                <div className='flex h-[350px] flex-col justify-center space-y-4 px-6 md:h-full md:w-full '>
                  <h2 className="text-black text-xl font-bold">{product.title}</h2>
                  <p className='text-slate-600 text-sm'>probando texto bla bla rfdfnj dsjdnfjdfsdnjndj djsndjnsndjsdn bla bla rfdfnj dsjdnfjdfsdnjndj djsndjnsndjsdn</p>
                  <div className='flex items-center justify-between'>
                    <span className="text-black text-lg font-semibold">{parseCurrency(product.price)}</span>
                    <button 
                      className={`rounded-xl px-4 py-3  flex items-center justify-center font-bold transition-all duration-200 ease-in-out 
                        ${isProductInCart ? 'bg-red-500 text-white hover:bg-white hover:text-red-500' : 'bg-emerald-600 text-white hover:bg-white hover:text-emerald-600'}`}
                      onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)}
                    >
                        {
                          isProductInCart ? <span className='flex items-center gap-2 text-xs'><BsTrash className='text-lg' />Eliminar</span> : <span className='flex items-center gap-2 text-xs'><BsCart3 className='text-lg' />Agregar</span>
                        }
                    </button>
                  </div>
                </div>
              </li>
            )
          }) 
        )}
      </ul>

    </main>
  )
};

export default Products;
