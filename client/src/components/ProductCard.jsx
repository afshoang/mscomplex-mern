import {useState} from 'react'
import { Link } from 'react-router-dom';

const ProductCard = props => {
    const [isDisplayAction, setIsDisplayAction] = useState(false)

  return (
    <div>
        <div 
            className='relative' 
            onMouseEnter={() => setIsDisplayAction(true)}
            onMouseLeave={() => setIsDisplayAction(false)}
        >
            <img src={props.img1} alt={props.title} />

            <div className={`absolute bottom-[15%] w-full ${isDisplayAction ? 'opacity-100' : 'opacity-0'} transition ease-in delay-100 duration-300 flex justify-center gap-3`}>
                <Link to="/" className='w-[50px] h-[50px] rounded-[50%] bg-white hover:bg-primary duration-300 flex justify-center items-center text-md leading-10'><i className='bx bx-heart'></i></Link>
                <Link to="/cart" className='w-[50px] h-[50px] rounded-[50%] bg-white hover:bg-primary duration-300 flex justify-center items-center text-md leading-10'><i className='bx bxs-cart-add'></i></Link>
            </div>
        </div>

        <div className='mt-6 text-center'>
            <h5 className='text-[#888] font-normal text-sm hover:text-primary duration-200 cursor-pointer'>
                <Link to={props.slug}>{props.title}</Link>
            </h5>
            <div className='font-bold'>
                {props.price}
                <span className='ml-3 font-normal'><del>3900000</del></span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard