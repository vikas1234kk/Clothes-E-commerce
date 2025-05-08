import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import Loader from './Loader'; // Import the loader component

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [LatestProducts, setLetestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state

  useEffect(() => {
    // Check if products are available
    if (products && products.length > 0) {
      setLetestProducts(products.slice(0, 10));
      setIsLoading(false);  // Set loading to false when products are available
    }
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'ALL'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700' >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, ipsum?
        </p>
      </div>

      {/* If loading, show loader */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        // Rendering products when data is available
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {LatestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      )}

    </div>
  )
}

export default LatestCollection;
