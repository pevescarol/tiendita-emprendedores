'use client'

import { useState, useEffect } from 'react';
import { fetchProducts } from '@/utils/api'; // Importa la función fetchProducts de la carpeta api
import Image from 'next/image';
import Filters from './Filters';
import { useCart } from '@/hooks/useCart';
import { parseCurrency } from '@/utils/currency';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
  });
  const { addToCart, removeFromCart, cart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts(); // función fetchProducts para obtener los datos
      setProducts(productsData);
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
    <main className='flex flex-col items-center justify-center gap-10 w-full'>
      {/* Filtrar productos */}
      <Filters filters={filters} setFilters={setFilters} />
      {/* Productos */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const isProductInCart = checkProductInCart(product)
  
          return (
            <li key={product.id} className="rounded-xl border p-4 flex flex-col gap-4 shadow-md bg-[#111] text-white ">
            {/* item del producto */}
            <Image src={product.image} alt={product.title} width={100} height={100} className="mb-2 w-full object-cover bg-white rounded-xl" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm font-semibold text-slate-300">{parseCurrency(product.price)}</p>
            <button style={{backgroundColor: isProductInCart ? 'red' : ''}} onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)} className='bg-emerald-600 rounded-md p-2'>
              {
                isProductInCart ? 'Eliminar' : 'Agregar a carrito'
              }
            </button>
          </li>)
        }
        ) }
      </ul>

    </main>
  )
};

export default Products;
