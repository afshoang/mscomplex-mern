import { useState } from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    const [isDisplayedNav, setIsDisplayedNav] = useState(false)

  return (
    <header>
        <div className='container'>
            <nav className='flex relative justify-between items-center py-4 lg:py-0 px-3'>
                <Link to="/"><h1 className='font-bold text-2xl'>MRCOMPLEX<span className='text-primary'>.</span></h1></Link>

                {/* nav link destop */}
                <ul className='hidden lg:flex justify-between items-center text-sm font-medium'>
                    <li><Link to="/" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Trang chủ</Link></li>
                    <li><Link to="/catalog" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Sản phẩm</Link></li>
                    <li><Link to="" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Liên hệ</Link></li>
                </ul>

                {/* nav link mobile */}
                <ul className={`${isDisplayedNav ? `flex` : `hidden`} absolute bg-white top-[100%] left-0 w-full  flex-col text-sm font-medium z-[3]`}>
                    <li><Link to="/" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Trang chủ</Link></li>
                    <li><Link to="/catalog" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Sản phẩm</Link></li>
                    <li><Link to="" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Liên hệ</Link></li>
                </ul>

                <div className='flex items-center gap-3'>
                    {/* toggle icon */}
                    <a href="#" className='lg:hidden text-xl cursor-pointer' onClick={() => setIsDisplayedNav(!isDisplayedNav)}>
                        <i className='bx bx-menu'></i>
                    </a>
                    <Link to="#" className='text-xl hover:text-primary duration-200 cursor-pointer'><i className='bx bx-search-alt-2'></i></Link>
                    <Link to="/" className='text-xl hover:text-primary duration-200 cursor-pointer relative'>
                        <i className='bx bx-user'></i>
                        {/* <ul className={`hidden absolute bg-white top-[100%] right-0 w-[150px] flex flex-col text-sm`}>
                            <li><a href="#" className='block hover:text-primary hover:bg-[#f5f5f5] duration-200 py-4 px-4'>Register</a></li>
                            <li><a href="#" className='block hover:text-primary hover:bg-[#f5f5f5] duration-200 py-4 px-4'>Login</a></li>
                        </ul> */}
                    </Link>
                    <Link to="/cart" className='text-xl hover:text-primary duration-200 cursor-pointer'><i className='bx bx-cart'></i></Link>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Header