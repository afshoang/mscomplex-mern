import { useState, useRef, useEffect } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

import { useSearchParams  } from 'react-router-dom';
import { useGetProductsQuery } from '../app/features/productsApiSlice';
import { Checkbox, ProductCard } from '../components';
import { useOutsideAlerter } from '../hooks';
import { useTitle } from '../hooks';

const Catalog = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const searchQ = searchParams.get("search")

    useTitle(`${searchQ ? `${searchQ} - Tìm kiếm` : 'Sản phẩm'}`)
    
    const initFilter = {
        category: [],
        color: [],
        size: []
    }

    const [filter, setFilter] = useState(initFilter)

  const [categories, setCategories] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [currPage, setCurrPage] = useState(1);

  const {
        data: products,
        isLoading,
        isSuccess,
        // isError,
        // error
  } = useGetProductsQuery({ categories: filter.category, colors: filter.color, sizes: filter.size, search: searchQ }) // page: currPage || 1, limit: 8 

    useEffect(() => {
        const allCategories = products?.reduce((curr, prev) => {
            return curr.concat(prev.categories)
        }, [])
        const allColors = products?.reduce((curr, prev) => {
            return curr.concat(prev.color)
        }, [])
        const allSizes = products?.reduce((curr, prev) => {
            return curr.concat(prev.size)
        }, [])
        // setCurrPage(1)
        setCategories(allCategories)
        setColors(allColors)
        setSizes(allSizes)
    },[products])

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item]})
                    break
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, item.toLowerCase()]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e.toLowerCase() !== item.toLowerCase())
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e.toLowerCase() !== item.toLowerCase())
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE":
                    console.log("????? else");
                    const newSize = filter.size.filter(e => e.toLowerCase() !== item.toLowerCase())
                    setFilter({...filter, size: newSize})
                    break
                default:
            }
        }
    }

    const clearFilter = () => {
        setFilter(initFilter)
        setCurrPage(1)
    }

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
                    className='max-lg:shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-w-[270px] fixed transition-transform duration-300 ease-in 
                    -translate-x-full top-0 left-0 z-10 bg-white h-full pt-3 px-3 lg:p-0 lg:static lg:w-1/5 lg:translate-x-0'
                >
                    <div>
                        <div className='text-md font-bold mb-5 capitalize'>Danh mục sản phẩm</div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            {
                               categories && [...new Set(categories)].map((item, index) => <div
                                    key={index}
                                    className='mb-3'
                                >
                                    <Checkbox
                                        label={item}
                                        onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                        checked={filter.category.includes(item)}
                                    />
                                    
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='text-md font-bold mb-5 capitalize'>màu sắc</div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            {
                                colors && [ ...new Set(colors)].map((item, index) => <div
                                    key={index}
                                    className='mb-3'
                                >
                                    <Checkbox 
                                        label={item}
                                        onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                        checked={filter.color.includes(item)}
                                    />
                                    
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='text-md font-bold mb-5 capitalize'>Kích thước</div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            {
                                sizes && [... new Set(sizes)].map((item, index) => <div
                                    key={index}
                                    className='mb-3'
                                >
                                    <Checkbox 
                                        label={item}
                                        onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                        checked={filter.size.includes(item)}
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
                { isLoading && <PulseLoader color={"#ff5353"} /> }
                <div className='flex-1 lg:w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        isSuccess && products.map(product => <ProductCard key={product._id} product={product} />)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Catalog