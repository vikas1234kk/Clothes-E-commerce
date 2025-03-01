import React from 'react'
import Title from './Title';
import  { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext'

const CasualMens = () => {

    const { products } = useContext(ShopContext);
    const [casualMens, setCasualMens] = useState([]);


    useEffect(() => {
        const casualProducts = products.filter((item) => (item.casualMens));
        setCasualMens(casualProducts.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, eligendi?
                </p>
            </div>

            {/* rendering casual collections for mens products */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    casualMens.map((item,index)=>(
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                    ))
                }

            </div>
        </div>
    )
}

export default CasualMens
