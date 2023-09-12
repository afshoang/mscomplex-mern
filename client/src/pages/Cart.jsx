import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { 
  selectCartItems, 
  selectCartQuantity, 
  selectCartTotalPrice, 
  changeQuantityItem, 
  removeItem 
} from '../app/features/cartSlice';

import { Button } from '../components';
import formatMoney from '../utils/formatMoney';
import { useTitle } from '../hooks';

const Cart = () => {
  useTitle('Giỏ hàng')

  const cartItems = useSelector(selectCartItems)
  const cartQuantity = useSelector(selectCartQuantity)
  const cartTotalPrice = useSelector(selectCartTotalPrice)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUpdateQuantity = (productId, type, quantity) => {
      if (type === 'plus') {
          dispatch(changeQuantityItem({ productId, quantity: quantity + 1 }))
      } else {
        if (quantity === 1) return
        dispatch(changeQuantityItem({ productId, quantity: quantity - 1 < 1 ? 1 : quantity - 1 }))
      }
  }

  return (
    <div className='container px-4 mb-5'>
      <div className='flex flex-col gap-5 lg:gap-3 xl:flex-row xl:items-start'>
        <div className='flex-[3]'>
          <p className='py-5'><span className='uppercase font-bold'>Giỏ hàng </span><span>({cartQuantity}) sản phẩm</span></p>
          {
            cartItems && cartItems.map((item,index) => <div 
              key={index}
              className='flex pt-4'
            >
            <div>
              <Link to={`/products/${item.product._id}`}>
                  <img className='rounded max-w-[120px] max-h-[160px]' src={item.product.img[0].url} alt={item.product.title} />
                </Link>
            </div>
            <div className='flex-grow flex flex-col gap-3 md:flex-row pl-5'>
              <div className='flex-[3] lg:flex-[3.6] flex flex-col justify-between'>
                  <Link to={`/products/${item.product._id}`} className='hover:text-primary duration-150'>
                    {item.product.title}
                  </Link>

                  <div><span className='capitalize'>{item.color}</span> / <span className='uppercase'>{item.size}</span></div>
              </div>
              <div className='font-bold flex-[1.5]'>{formatMoney(item.product.price)}đ</div>
              <div className='flex-[2]'>
                <div className='flex justify-start text-lg leading-9'> 
                <div 
                    onClick={() => handleUpdateQuantity(item.product._id, 'minus', item.quantity)}
                    className={`flex justify-center items-center w-[40px] h-[40px] rounded-tl 
                    rounded-bl border border-solid border-[#D9D9D9] ${item.quantity > 1 ? 'cursor-pointer text-black' : 'cursor-default text-[#DEDDDD]'}`}
                >
                    <i className='bx bx-minus'></i>
                </div>
                <div className='flex justify-center items-center w-[40px] h-[40px] border border-solid border-[#D9D9D9] leading-4 text-sm'>
                    {item.quantity}
                </div>
                <div 
                onClick={() => handleUpdateQuantity(item.product._id, 'plus', item.quantity)}
                className='flex justify-center items-center w-[40px] h-[40px] rounded-tr rounded-br border border-solid border-[#D9D9D9] cursor-pointer'>
                    <i className='bx bx-plus'></i>
                </div>
            </div>
              </div>
              <div className='flex flex-col justify-between flex-[1.5]'>
                <div className='font-bold hidden md:block'>{formatMoney(item.product.price * item.quantity)}đ</div>

                <div 
                  onClick={() => dispatch(removeItem({productId: item.product._id}))}
                  className='cursor-pointer text-xl flex justify-start'>
                    <i className='bx bx-trash text-gray-400'></i>
                </div>
              </div>
            </div>
          </div>)
          }
        </div>
        {
          cartItems?.length > 0 && 
          (<div className='flex-1 pt-5 shadow'>
            <div className='flex justify-between items-center p-3'>
              <div><span>Tổng đơn: </span><span className='font-bold'>{formatMoney(cartTotalPrice)}đ</span></div>

              <Button onClick={() => navigate('/checkout')}>Thanh toán</Button>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default Cart