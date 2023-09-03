import { Button, QuantityBox } from '../components';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className='container px-4 mb-5'>
      <div className='flex flex-col gap-5 lg:gap-3 xl:flex-row '>
        <div className='flex-[3]'>
          <p className='py-5'><span>Giỏ hàng </span><span>(2) sản phẩm</span></p>
          {/* <div className='hidden md:flex'>
            <div className='flex-[5]'>Sản phẩm</div>
            <div className='flex-[1.5]'>Đơn giá</div>
            <div className='flex-[2]'>Số lượng</div>
            <div className='flex-[1.5]'>Tổng tiền</div>
          </div> */}
          <div className='flex pt-4'>
            <div>
              <Link to='/'>
                  <img className='rounded' src="https://bizweb.dktcdn.net/thumb/compact/100/438/408/products/quan-short-nam-qsm6037-nav-6.jpg" alt="" />
                </Link>
            </div>
            <div className='flex-grow flex flex-col gap-3 md:flex-row pl-5'>
              <div className='flex-[3] lg:flex-[3.6] flex flex-col justify-between'>
                  <Link to='/' className='hover:text-primary duration-150'>
                    Product name
                  </Link>

                  <div>Variant</div>
              </div>
              <div className='font-bold flex-[1.5]'>229.000đ</div>
              <div className='flex-[2]'>
                <QuantityBox />
              </div>
              <div className='flex flex-col justify-between flex-[1.5]'>
                <div className='font-bold hidden md:block'>458.000đ</div>

                <div className='cursor-pointer text-xl flex justify-start'><i className='bx bx-trash'></i></div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 pt-5 shadow'>
          <div className='flex justify-between items-center p-3'>
            <div><span>Tổng đơn: </span><span>569000đ</span></div>

            <Button>Thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart