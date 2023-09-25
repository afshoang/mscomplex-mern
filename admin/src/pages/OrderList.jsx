import { Link } from 'react-router-dom';
import { Table } from '../components';
import { useGetOrdersQuery, useDeleteOrderMutation } from '../features/order/ordersApiSlice';
import { PulseLoader } from 'react-spinners'

const OrderList = () => {
    const {
        data: orders,
        isLoading,
        isSuccess,
        // isError,
        // error
  } = useGetOrdersQuery({})

//   const [
//         deleteOrder,
//     {
//         // data: deletedProduct,
//         isLoading: isDeletingOrder, 
//         isSuccess: isSuccessDeleteOrder 
//     }
// ] = useDeleteOrderMutation()

  if (isLoading) return <PulseLoader color={"#ff5353"} />

  const orderTableHead = [
    '',
    'Tên',
    'Sản phẩm',
    'Tổng tiền',
    'Trạng thái',
]

const renderHead = (item, index) => <th key={index} className='capitalize py-4 px-2.5'>{item}</th>

const renderBody = (item, index) => (
    <tr key={index} className='text-center hover:bg-primary hover:text-white'>
        <td className='capitalize py-4 px-2.5'>{index + 1}</td>
        <td className='capitalize py-4 px-2.5'>{item.shippingInfo?.fullName}</td>
        <td className='capitalize py-4 px-2.5'>
            <ul>
                {
                    item.orderItems.map(item => item.product || 'noname').map((item, index) => <li key={index}>{item.title}</li>)
                }
            </ul>
        </td>
        <td className='capitalize py-4 px-2.5'>{item.totalPrice}</td>
        <td className='capitalize py-4 px-2.5'>{item.status}</td>
    </tr>
)
  return (
    <div>
         <div className='mb-8 flex justify-between items-center'>
            <h2 className='capitalize text-2xl font-semibold'>Đơn hàng</h2>
        </div>

        <div>
            <div>
                <div className='p-7 mb-7 bg-mainBg rounded-main shadow-main-shadow'>
                    <div>
                        {
                            isSuccess && <Table
                                limit='10'
                                headData={orderTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={orders}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderList