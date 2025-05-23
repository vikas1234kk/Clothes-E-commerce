import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import Loader from './Loader';  // Import the loader component

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
        // Check if products are available
        if (products && products.length > 0) {
            const bestProducts = products.filter((item) => item.bestseller);
            setBestSeller(bestProducts.slice(0, 5));
            setIsLoading(false);  // Set loading to false when products are available
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, eligendi?
                </p>
            </div>
            
            {/* If loading, show loader */}
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                // Rendering best seller products when data is available
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default BestSeller;
