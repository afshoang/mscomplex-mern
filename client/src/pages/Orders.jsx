import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../app/features/ordersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import formatMoney from '../utils/formatMoney';
import { useTitle } from '../hooks';

const Orders = () => {
    useTitle('MSCOMPLEX - Đơn hàng của tôi')

    const {
        data: orders,
        isLoading,
        isSuccess,
        // isError,
        // error
  } = useGetMyOrdersQuery('ordersList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

  return (
    <div className='container px-4 mb-5 h-screen'>
        { isLoading && <PulseLoader color={"#ff5353"} /> }
        
        {
            (isSuccess && orders?.length > 0) && <>
                <div className='grid grid-cols-12 uppercase font-medium'>
                    <div className='col-span-3 py-3'><h5>Ngày</h5></div>
                    <div className='col-span-4 py-3'><h5>Mã đơn hàng</h5></div>
                    <div className='col-span-2 py-3'><h5>Trạng thái</h5></div>
                    <div className='col-span-3 py-3'><h5>Tổng tiền</h5></div>
                </div>
            
                {
                    orders.map(item => <div key={item._id} className='grid grid-cols-12'>
                        <div className='col-span-3 py-2 border-y border-dashed border-[#e5e5e5]'><h5>{formatDate(item.createdAt)}</h5></div>
                        <div className='col-span-4 py-2 border-y border-dashed border-[#e5e5e5]'>
                            <Link 
                                className='hover:text-primary duration-150'
                                to={`/my-orders/${item._id}`}>
                                {item._id}
                            </Link>
                        </div>
                        <div className='col-span-2 py-2 border-y border-dashed border-[#e5e5e5] capitalize'><p>{item.status}</p></div>
                        <div className='col-span-3 py-2 border-y border-dashed border-[#e5e5e5]'><p>{formatMoney(item.totalPrice)}</p></div>
                    </div>)
                }
            </>
        }
        
        
        
    </div>
  )
}

export default Orders