import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }


    })
  }
  useEffect(() => {
    if(products.length > 0){
      fetchProductData();
    }
    
  }, [productId, products])

  if (!productData) return <p>Loading...</p>;



  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-600 opacity-100'>
      {/* product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* products images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col oveflow-x auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 6" />
            <img src={assets.star_icon} alt="" className="w-3 6" />
            <img src={assets.star_icon} alt="" className="w-3 6" />
            <img src={assets.star_icon} alt="" className="w-3 6" />
            <img src={assets.star_dull_icon} alt="" className="w-3 6" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-3 text-xl font-medium'>{currency}{productData.price}</p>
          <p className='text-gray-600 mt-2 '>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-300 ${item == size ? 'border-red-700' : ''}`} key={index}>{item}</button>
                ))
              }

            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/7' />
          <div className='text-sm text-gray-600 mt-6 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash On Delievery Available On This Product</p>
            <p>Easy Return And Exchange Policy Available </p>
          </div>
        </div>
      </div>
      {/* Description And Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-6 py-3 text-sm'>Description</b>
          <p className='text-sm border px-6 py-3'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-1 px-6 py-6 text-gray-700 border text-sm mt-3'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos hic quisquam ex consectetur eligendi unde, totam fugit perspiciatis fugiat minima, aspernatur necessitatibus, itaque repudiandae temporibus!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic id dolor ipsa aspernatur fugiat, animi, omnis corporis magni numquam, fuga magnam eveniet sunt perferendis! Molestiae, molestias.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
