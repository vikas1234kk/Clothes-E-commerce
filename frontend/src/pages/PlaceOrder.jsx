import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const { naviGate, backendUrl, token, cartItem, setCartItem, CartAmount, delieveryfee, products } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(products => products._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)

            }

          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: CartAmount() + delieveryfee
      }
      
      switch (method) {

        // api call for cod

        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}});
          console.log(response.data);
          if (response.data.success) {
            setCartItem({})
            naviGate('/orders')
            
          } else {
            toast.error(response.data.message)
          }

          break;

          case  'stripe':
             
          const responseStripe = await axios.post(backendUrl+ '/api/order/stripe', orderData, {headers:{token}}) 

          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
            
          } else {
            toast.error(responseStripe.data.message)
          }


          break;

          default:
          break;
      }
console.log(orderItems)

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }






  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIEVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='border border-gray-300 pl-2 rounded py-1   px-3.6 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="text" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="text" placeholder='Street Name' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 pl-2 rounded py-1   px-3.6 w-full' type="text" placeholder='City Name' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="text" placeholder='State ' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='pincode' value={formData.pincode} className='border border-gray-300 pl-2 rounded py-1   px-3.6 w-full' type="number" placeholder='Pincode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="text" placeholder='country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-3 pl-2 00 rounded py-1 px-3.6 w-full' type="number" placeholder='phone' />
      </div>




      {/* right side  */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />

        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          {/* payment method selection  */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3 h-3 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-6 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3 h-3 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-6 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3 h-3 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-sm text-gray-700 font-medium'>CASH ON DELIEVERY </p>
            </div>

          </div>
          <div className='w-full text-end mt-8'>
            <button type='Submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

          </div>

        </div>

      </div>
    </form>


  )
}

export default PlaceOrder
