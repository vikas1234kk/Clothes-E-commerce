import React from 'react'
import Title from '../components/Title'
import NewsLetter from '../components/NewsletterBox'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full max-w-[460px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nemo libero quos recusandae odio illum corrupti. In, veniam fugit! Autem lorem20</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto in possimus est dolorem! Dolorem sed quidem unde ut sit animi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil sed placeat doloribus est ut, cumque quos vitae eius cum perspiciatis?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic dicta delectus omnis ipsum officia, deserunt quod iure provident accusamus impedit, exercitationem eveniet neque asperiores incidunt magnam. Magni, eveniet molestias.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus aperiam cupiditate quasi perspiciatis dolore dolorem laborum neque placeat non labore!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
          <b>Convinence</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus aperiam cupiditate quasi perspiciatis dolore dolorem laborum neque placeat non labore!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus aperiam cupiditate quasi perspiciatis dolore dolorem laborum neque placeat non labore!</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
