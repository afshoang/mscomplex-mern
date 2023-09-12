import { useParams } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../app/features/ordersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import formatMoney from '../utils/formatMoney';
import { useTitle } from '../hooks';

const OrderDetail = () => {
    const { id } = useParams()
     const { order, error, isLoading, isSuccess } = useGetMyOrdersQuery("ordersList", {
        selectFromResult: ({ data, error, isLoading, isSuccess }) => ({
            order: data?.find(item => item._id === id),
            error,
            isLoading,
            isSuccess
        })
    })
    useTitle('MSCOMPLEX - Chi tiết đơn hàng')

    if (isLoading) return <PulseLoader color={"#ff5353"} />

  return (
    <div className='container px-4 mb-5'>
        <h2 className='text-2xl font-bold mb-5'>Chi tiết đơn hàng</h2>

        {
            isSuccess &&
            <>
                <div>
                    <h5 className='text-lg font-bold mb-3'>Thông tin giao hàng</h5>
                    
                    <div className='flex flex-wrap'>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Họ tên: </p>
                            <p>{order.shippingInfo?.fullName}</p>
                        </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Điện thoại: </p>
                            <p>{order.shippingInfo?.phoneNumber}</p>
                        </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Địa chỉ: </p>
                            <p>{order.shippingInfo?.address}</p>
                        </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Tỉnh / Thành phố: </p>
                            <p>{order.shippingInfo?.city}</p>
                        </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Quận / Huyện: </p>
                            <p>{order.shippingInfo?.district}</p>
                        </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Phường / Xã </p>
                            <p>{order.shippingInfo?.ward}</p>
                            </div>
                        <div className='w-4/12 max-w-4/12 mb-3'>
                            <p className='font-medium'>Phương thức thanh toán: </p>
                            <p>{order.shippingInfo?.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <h5 className='text-lg font-bold mb-3'>Danh sách sản phẩm</h5>

                    <div className='grid grid-cols-12 uppercase font-medium'>
                        <div className='col-span-4 py-3'><h5>Sản phẩm</h5></div>
                        <div className='col-span-2 py-3'><h5>Số lượng</h5></div>
                        <div className='col-span-3 py-3'><h5>Đơn giá</h5></div>
                        <div className='col-span-3 py-3'><h5>Tổng tiền</h5></div>
                    </div>
            
                {
                    order.orderItems.map((item, index) => <div key={index} className='grid grid-cols-12'>
                        <div className='col-span-4 py-2 border-y border-dashed border-[#e5e5e5]'><h5>{item.product?.title}</h5></div>
                        <div className='col-span-2 py-2 border-y border-dashed border-[#e5e5e5]'>
                            {item.quantity}
                        </div>
                        <div className='col-span-3 py-2 border-y border-dashed border-[#e5e5e5]'><p>{formatMoney(item.product?.price)}</p></div>
                        <div className='col-span-3 py-2 border-y border-dashed border-[#e5e5e5]'><p>{formatMoney(item.product?.price * item.quantity)}</p></div>
                    </div>)
                }

                <div className='grid grid-cols-12 mt-3'>
                        <div className='col-span-4 py-3'></div>
                        <div className='col-span-2 py-3'></div>
                        <div className='col-span-3 py-3'></div>
                        <div className='col-span-3 py-3'>
                            <div>
                                <p>Phí ship: <span>{formatMoney(20000)}</span></p>

                                <div>
                                    <h5 className='font-bold text-lg'>Tổng: <span className='text-base'>{formatMoney(order.totalPrice)}</span></h5> 
                                </div>
                        </div>
                    </div>
                </div>
               
                </div>
            </>
        }
    </div>
  )
}

export default OrderDetail