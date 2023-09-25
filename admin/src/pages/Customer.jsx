import { Table } from '../components';
import { useGetUsersQuery } from '../features/user/usersApiSlice';
 import useTitle from '../hooks/useTitle';
 import PulseLoader from 'react-spinners/PulseLoader'

const renderHead = (item, index) => <th key={index} className='capitalize py-4 px-2.5'>{item}</th>

const renderBody = (item, index) => (
    <tr key={index} className='text-center hover:bg-primary hover:text-white'>
        <td className='py-4 px-2.5'>{index + 1}</td>
        <td className='capitalize py-4 px-2.5'>{item.username}</td>
        <td className='py-4 px-2.5'>{item.email}</td>
        {/* <td className='capitalize py-4 px-2.5'>{item.phone}</td> */}
        {/* <td className='capitalize py-4 px-2.5'>{item.total_orders}</td> */}
        {/* <td className='capitalize py-4 px-2.5'>{item.total_spend}</td> */}
        {/* <td className='capitalize py-4 px-2.5'>{item.location}</td> */}
    </tr>
)

const Customer = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
  } = useGetUsersQuery()
    console.log("🚀 ~ file: Customer.jsx:38 ~ Customer ~ users:", users)

  useTitle('MSCOMPLEX | Tài khoản')
    if (isLoading) return <PulseLoader color={"#ff5353"} />

    const customerTableHead = [
        '',
        'name',
        'email',
    ]

  return (
    <div>
        <div className='mb-8 flex justify-between items-center'>
            <h2 className='capitalize text-2xl font-semibold'>Customers</h2>
            {/* <button className='bg-primary hover:opacity-75
            rounded-main text-white leading-3 py-4 px-7'>Add Customer</button> */}
        </div>

        <div>
            <div>
                <div className='p-7 mb-7 bg-mainBg rounded-main shadow-main-shadow'>
                    <div>
                        <Table
                            limit='10'
                            headData={customerTableHead}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={users}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Customer