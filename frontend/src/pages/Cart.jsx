import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { currency, products, cartItem, updateQuantity, naviGate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
   
  }, [cartItem, products])
  return (
    <div className='border-t pt-14'>
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR '} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div key={index} className='py-4 border-t border-b text-gray grid grid-cols-[4fr_0.6fr_0.6fr] sm:grid-cols-[4fr_2fr_0.6fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center mt-3 gap-4'>
                      <p>{currency}{productData.price}</p>
                      <p className='border bg-gray-200 py-1 px-4'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border border-gray-700 mx-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-6 cursor-pointer' alt="" />

              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[460px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => naviGate('/placeOrder')} className='text-white py-3 px-8 my-8 bg-black text-sm'>PROCESSED TO CHECKOUT</button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart
