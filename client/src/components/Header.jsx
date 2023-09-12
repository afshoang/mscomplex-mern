import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { logOut, selectCurrentUser } from '../app/features/authSlice';
import { selectCartQuantity } from '../app/features/cartSlice';

const Header = () => {
    const [isDisplayedNav, setIsDisplayedNav] = useState(false)
    const [isDisplayedUserNav, setIsDisplayedUserNav] = useState(false)
    const user = useSelector(selectCurrentUser)
    const cartQuantity = useSelector(selectCartQuantity)

    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()
    const userNavRef = useRef(null)
    useOutsideAlerter(userNavRef,  () => setIsDisplayedUserNav(!isDisplayedUserNav))

    const handleSearch = () => {
        navigate({
            pathname: '/products',
            search: `?search=${searchQuery}`,
        })
        setSearchQuery('')
    }

    const dispatch = useDispatch()
  return (
    <header>
        <div className='container'>
            <nav className='flex relative justify-between items-center py-4 lg:py-0 px-3'>
                <Link to="/"><h1 className='font-bold text-2xl'>MSCOMPLEX<span className='text-primary'>.</span></h1></Link>

                {/* nav link destop */}
                <ul className='hidden lg:flex justify-between items-center text-sm font-medium'>
                    <li><Link to="/" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Trang chủ</Link></li>
                    <li><Link to="/products" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Sản phẩm</Link></li>
                    <li><Link to="" className='hover:text-primary duration-200 block py-11 px-4 uppercase font-bold'>Liên hệ</Link></li>
                </ul>

                {/* nav link mobile */}
                <ul className={`${isDisplayedNav ? `flex` : `hidden`} absolute bg-white top-[100%] left-0 w-full  flex-col text-sm font-medium z-[3]`}>
                    <li><Link onClick={() => setIsDisplayedNav(false)} to="/" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Trang chủ</Link></li>
                    <li><Link onClick={() => setIsDisplayedNav(false)} to="/products" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Sản phẩm</Link></li>
                    <li><Link onClick={() => setIsDisplayedNav(false)} to="/" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase font-bold text-sm'>Liên hệ</Link></li>
                </ul>

                <div className='flex items-center gap-3'>
                    {/* toggle icon */}
                    <a href="#" className='lg:hidden text-2xl cursor-pointer' onClick={() => setIsDisplayedNav(!isDisplayedNav)}>
                        <i className='bx bx-menu'></i>
                    </a>

                    {/* <Link to="#" className='text-2xl hover:text-primary duration-200 cursor-pointer'>
                        <i className='bx bx-search-alt-2'></i>
                    </Link> */}
                    <div className='relative hidden md:block'>
                        <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Tìm kiếm...' 
                        className='outline-none border-b-2 border-solid border-black focus:border-primary text-sm py-1 pr-6' />
                        <i 
                            onClick={handleSearch}
                        className='bx bx-search-alt-2 absolute top-[3px] right-0 text-lg cursor-pointer'></i>
                    </div>
                    {
                        user?.accessToken 
                        ?
                            <button 
                            onClick={() => setIsDisplayedUserNav(!isDisplayedUserNav)} 
                            className='text-lg duration-200 cursor-pointer relative flex items-center'
                            >
                                { user?.username }
                                <i className='bx bx-chevron-down'></i>
                                <ul ref={userNavRef} className={`${isDisplayedUserNav ? 'flex shadow-[0_3px_10px_rgb(0,0,0,0.2)]' : 'hidden'} absolute bg-white top-[100%] left-0 w-full min-w-[130px] flex-col font-medium text-xs z-[3] text-left`}>
                                    <li><Link to="/my-orders" className='hover:text-primary hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase'>Đơn hàng</Link></li>
                                    <li><Link onClick={() => dispatch(logOut())} className='hover:text-primary w-full text-left hover:bg-[#f5f5f5] duration-200 block py-4 px-4 uppercase'>Đăng xuất</Link></li>
                                </ul>
                            </button>
                        :
                            <Link 
                            to="/login" 
                            className='text-2xl hover:text-primary duration-200 cursor-pointer relative'
                            >
                                <i className='bx bx-user'></i>
                            </Link>
                    }
                    <Link to="/cart" 
                        className='text-2xl relative'>
                            <i className='bx bx-cart  hover:text-primary duration-200 cursor-pointer'></i>
                            <span className='absolute -top-1 -right-2 min-w-[17px] w-auto 
                            leading-4 bg-primary text-xs h-[17px] rounded-[50%] text-center'>
                                {cartQuantity}
                            </span>
                    </Link>
                </div>
            </nav>
        </div>
    </header>
  )
}

function useOutsideAlerter(ref, callback = null) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && ref.current.classList.contains('flex') && !ref.current.contains(event.target)) {
        callback && callback()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown",handleClickOutside);
    };
  }, [ref, callback]);
}

export default Header