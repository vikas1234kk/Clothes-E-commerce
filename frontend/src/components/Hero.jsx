import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { assets } from '../assets/assets'

const Hero = () => {
    const images = [
        "/image6 (1).jpg",
        "/image6 (2).jpg",
        "/image6 (3).jpg",
        "/image6 (4).jpg",
        "/image6 (5).jpg",
        "/image6 (6).jpg",

    ]


    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 h-80 overflow-hidden lg:h-80 '>
            {/* hero left side*/}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141] '>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base '>Our Best Seller</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-4xl leading-relaxed  '>LATEST ARRIVALS</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NN</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* hero right side*/}
            <div className=' w-full lg:w-1/2 overflow-hidden'>
                <Swiper spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 2000 }}
                    modules={[Autoplay]}
                    className="w-full h-full">
                    {
                        images.map((item, index) => (
                            <SwiperSlide>
                                <img src={item} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

            </div>
        </div>
    )
}

export default Hero
