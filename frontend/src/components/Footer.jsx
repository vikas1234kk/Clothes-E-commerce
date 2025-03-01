import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
      <div>
        <img src={assets.logo} className='mb-6 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, quod! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae vero illo voluptate temporibus? Libero, itaque recusandae quaerat sed iste pariatur!</p>
      </div>
      <div>
        <p className='text-xl font-medium mb-6'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>PRIVACY PLOICY</li>
          <li>DELEIVERY</li>
        </ul>
      </div>
      <div>
        <p className='tex-xl font-medium mb-6'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+91937606097</li>
          <li> <a href="">pcmvikasyt2004@gmail.com</a></li>
        </ul>
      </div>
    
      <div className='text-center'>
        <hr />
        <p className='text-sm text-center py-6 ml-36 '>copyright 2024@Solid brand.com  - All right reserved</p>
      </div>



    </div>
    
  )
}

export default Footer
