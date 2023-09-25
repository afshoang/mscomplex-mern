import { customerList } from '../assets/constant';
import { Table } from '../components';

const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location'
]

const renderHead = (item, index) => <th key={index} className='capitalize py-4 px-2.5'>{item}</th>

const renderBody = (item, index) => (
    <tr key={index} className='text-left hover:bg-primary hover:text-white'>
        <td className='capitalize py-4 px-2.5'>{item.id}</td>
        <td className='capitalize py-4 px-2.5'>{item.name}</td>
        <td className='capitalize py-4 px-2.5'>{item.email}</td>
        <td className='capitalize py-4 px-2.5'>{item.phone}</td>
        <td className='capitalize py-4 px-2.5'>{item.total_orders}</td>
        <td className='capitalize py-4 px-2.5'>{item.total_spend}</td>
        <td className='capitalize py-4 px-2.5'>{item.location}</td>
    </tr>
)

const Category = () => {
  return (
    <div>
        <div>
            <h2 className='mb-8 capitalize text-2xl font-semibold'>Categories</h2>
        </div>

        <div>
            <div>
                <div className='p-7 mb-7 bg-mainBg rounded-main shadow-main-shadow'>
                    <div>
                        <Table
                            limit='10'
                            headData={customerTableHead}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={customerList}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category