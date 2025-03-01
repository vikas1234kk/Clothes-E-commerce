import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'


const Collection = () => {
  const { products, search , showSearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const togglesubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setsubCategory(prev => [...prev, e.target.value])
    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice();

    {/* search in search bar and get related data */}
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setfilterProducts(productsCopy);

  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setfilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setfilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch,products]);

  useEffect(() => {
    sortProduct();
  },[sortType]);

  return (
    <div className='flex flex-cols sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter options */}
      <div className='min-w-60 '>
        <p onClick={() => setshowFilter(!showFilter)} className=' my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img className={`h-3 sm:hidden  ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        {/* CATEGORY FILTERS */}
        <div className={`bg-gray-100 border border-gray-300 pl-6 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='font-sm mb-3 font-medium'>CATEGORIES</p>
          <div className='flex flex-col font-light ga-2 text-gray-700 text-sm'>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> kids
            </p>
          </div>
        </div>
        {/* SUBCATEGORIES FILTER */}
        <div className={` bg-gray-100 border border-gray-300 pl-6 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='font-sm mb-3 font-medium'>TYPE</p>
          <div className='flex flex-col font-light ga-2 text-gray-700 text-sm'>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={togglesubCategory} /> Topwear
            </p>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={togglesubCategory} /> Bottom Wear
            </p>
            <p className='flex gap-2 mt-1'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={togglesubCategory} /> Winterwear
            </p>
          </div>
        </div>

      </div>


      {/* right side  */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* prduct sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 bg-gray-200 border-gray-300 px-2 text-sm' >
            <option value="relavent">Sortby: Relavent</option>
            <option value="low-high">Sortby: Low to High</option>
            <option value="high-low">Sortby: High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }

        </div>
      </div>

    </div>
  )
}

export default Collection
