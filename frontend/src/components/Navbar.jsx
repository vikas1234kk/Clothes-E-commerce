import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';


const Navbar = () => {

    const [Visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, naviGate, token, setToken, setCartItem } = useContext(ShopContext)

    const logOut = () => {
        naviGate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItem({})
        
    }


    return (
        <div className='flex items-center justify-between py-6 font-medium'>
            <Link to='/'><img src="/logo.jpg" className='w-24' alt="" /></Link>
            <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.6px] bg-gray-700 hidden' />

                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-6 cursor-pointer' alt="" />

                <div className='group relative'>
                  
                    <img onClick={()=> token ? null : naviGate('/login')} src={assets.profile_icon} className='w-6 cursot-pointer' alt="" />
                    {/* Drop down menu */}
                    
                    {
                        token && 
                        <div className='group-hover:block hidden absolute z-50 dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col py-2 px-3 w-36 gap-2 bg-slate-100 text-gray-600 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=>naviGate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logOut} className='cursor-pointer hover:text-black'>LogOut</p>
                        </div>

                    </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-6 min-w-6' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-4 cursor pointer sm:hidden ' alt="" />
            </div>
            {/* side bar menu after small screen*/}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${Visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-700'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border cursor-pointer' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border cursor-pointer' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border cursor-pointer' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border cursor-pointer' to='/contact'>CONTACT</NavLink>

                </div>
            </div>
        </div>
    )
}

export default Navbar
