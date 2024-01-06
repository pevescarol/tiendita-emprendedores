'use client'

import { useState, useEffect } from 'react';
import { fetchProducts } from '@/utils/api'; // Importa la función fetchProducts de la carpeta api
import Image from 'next/image';
import Filters from './Filters';
import { useCart } from '@/hooks/useCart';
import { parseCurrency } from '@/utils/currency';
import { BsCart3, BsTrash } from 'react-icons/bs'
import ProductModal from './ProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
  });
  const { addToCart, removeFromCart, cart } = useCart()
  const [loading, setLoading] = useState(true)

  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const googleSheetAPI = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API
        const productsData = await fetchProducts(googleSheetAPI); // función fetchProducts para obtener los datos
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

  // Modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };


  return (
    <main className='flex flex-col items-center justify-center max-w-5xl mx-auto px-6 '>
      {/* Filtrar productos */}
      <Filters filters={filters} setFilters={setFilters} />
      {/* Productos */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 mt-8 md:px-0 items-center mx-auto">
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
              <li 
                key={product.id} 
                className="flex h-[450px] w-[320px] flex-col overflow-hidden bg-white rounded-2xl drop-shadow md:h-[200px] md:w-full md:flex-row"
              >
                {/* item del producto */}
                <div className='h-[240px] md:h-full md:w-[250px] bg-grayback'>
                  <Image src={product.image} alt={product.title} loading='lazy' width={300} height={300} className="object-cover h-full w-full " />
                </div>
                <div className='text-main flex h-[350px] flex-col justify-center space-y-5 px-4 md:h-full md:w-full '>
                  <h2 className="text-xl font-bold">{product.title}</h2>
                  <div>
                    <p className=' text-sm overflow-hidden whitespace-nowrap overflow-ellipsis w-[220px]'>{product.description}</p>
                    <span onClick={() => handleProductClick(product)} className='cursor-pointer text-xs font-semibold'> Ver más</span>
                  </div>
                  <div className='flex items-center justify-between space-x-3'>
                    <span className="text-lg font-semibold">{parseCurrency(product.price)}</span>
                    <button 
                      className={`rounded-xl px-4 py-3  flex items-center justify-center font-bold transition-all duration-200 ease-in-out 
                        ${isProductInCart ? 'bg-redx text-white hover:bg-white hover:text-redx' : 'bg-greenw text-white hover:bg-white hover:text-greenw'}`}
                      onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)}
                    >
                      {
                        isProductInCart ? <span className='flex items-center gap-2 text-sm'><BsTrash className='text-lg' />Eliminar</span> : <span className='flex items-center gap-2 text-sm'><BsCart3 className='text-lg' />Agregar</span>
                      }
                    </button>
                  </div>
                </div>
              </li>
            )
          }) 
        )}
      </ul>

      {/* Renderizar el modal si un producto está seleccionado */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

    </main>
  )
};

export default Products;
