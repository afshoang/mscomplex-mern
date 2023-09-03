import { useState, useRef, useEffect } from 'react'

import { Checkbox, ProductCard } from '../components';
import { products } from '../constants';

const Catalog = () => {
    const category = [
        {
            display: "Áo thun",
            categorySlug: "ao-thun"
        },
        {
            display: "Áo somi",
            categorySlug: "ao-somi"
        },
        {
            display: "Quần jean",
            categorySlug: "quan-jean"
        }
    ]

    const colors = [
    {
        display: "Trắng",
        color: "white"
    },
    {
        display: "Hồng",
        color: "pink"
    },
    {
        display: "Đen",
        color: "black"
    },
    {
        display: "Vàng",
        color: "yellow"
    },
    {
        display: "Cam",
        color: "orange"
    },
    {
        display: "Xanh dương",
        color: "blue"
    }
    ]

    const initFilter = {
        category: [],
        color: [],
        size: []
    }

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, item.size]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({...filter, size: newSize})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const filterRef = useRef(null)

    const toggleFilter = () => filterRef.current.classList.toggle('active')

   useOutsideAlerter(filterRef);

  return (
    <div>
        <div className='container px-4 mb-5'>
            <div className='my-3'>
                <div 
                    onClick={toggleFilter}
                    className='text-black mr-3 flex justify-start items-center lg:hidden text-sm cursor-pointer max-w-[80px]'
                ><span>Bộ lọc</span><span><i className='bx bx-filter-alt text-lg'></i></span></div>
            </div>
            <div className='flex justify-start items-start gap-3'>
                <aside 
                    ref={filterRef}
                    className='max-w-[270px] fixed transition-transform duration-300 ease-in 
                    -translate-x-full top-0 left-0 z-10 bg-white h-full pt-3 pl-3 lg:p-0 lg:static lg:w-1/5 lg:translate-x-0'
                >
                    <div>
                        <div className='text-md font-bold mb-5 capitalize'>Danh mục sản phẩm</div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            {
                                category.map((item, index) => <div
                                    key={index}
                                    className='mb-3'
                                >
                                    <Checkbox
                                        label={item.display}
                                        onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                    
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='text-md font-bold mb-5 capitalize'>màu sắc</div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            {
                                colors.map((item, index) => <div
                                    key={index}
                                    className='mb-3'
                                >
                                    <Checkbox 
                                        label={item.display}
                                        onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                        checked={filter.color.includes(item.color)}
                                    />
                                    
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='mt-5'>
                        <button 
                            onClick={clearFilter}
                            className='bg-primary p-3 rounded-md text-xs text-white'
                        >Xóa bộ lọc</button>
                    </div>
                </aside>
                
                <div className='flex-1 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        products.map(product => <ProductCard 
                            key={product.id}
                            img1={product.image01}
                            title={product.title}
                            price={product.price}
                            slug={product.slug}
                        />)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && ref.current.classList.contains('active') && !ref.current.contains(event.target)) {
        ref.current.classList.remove('active')
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default Catalog