import { Link } from 'react-router-dom';
import { Table } from '../components';
import { useGetProductsQuery, useDeleteProductMutation } from '../features/product/productsApiSlice';
import { useEffect } from 'react';

import { toast } from 'react-toastify';
import {PulseLoader, ClipLoader} from 'react-spinners'

const ProductList = () => {
    const {
        data: products,
        
        isLoading,
        isSuccess,
        isError,
        error
  } = useGetProductsQuery({} , {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
  })
  const [
        deleteProduct,
    {
        data: deletedProduct,
        isLoading: isDeletingProduct, 
        isSuccess: isSuccessDeleteProduct 
    }
] = useDeleteProductMutation()

useEffect(() => {
    if (isSuccessDeleteProduct) {
        toast('Đã xóa sản phẩm thành công!')
    }
}, [isSuccessDeleteProduct])

    const productTableHead = [
        '',
        'Tên sản phẩm',
        'danh mục',
        'Kích thước',
        'Màu sắc',
        'Số lượng',
        'Giá tiền',
        ''
    ]

    const renderHead = (item, index) => <th key={index} className='capitalize py-4 px-2.5'>{item}</th>

const renderBody = (item, index) => (
    <tr key={index} className='text-left hover:bg-primary hover:text-white'>
        <td className='py-4 px-2.5'>{index + 1}</td>
        <td className='capitalize py-4 px-2.5'>{item.title}</td>
        <td className='capitalize py-4 px-2.5'>{item.categories}</td>
        <td className='uppercase py-4 px-2.5'>{item.size?.join(', ')}</td>
        <td className='capitalize py-4 px-2.5'>{item.color?.join(', ')}</td>
        <td className='capitalize py-4 px-2.5'>{item.quantity}</td>
        <td className='capitalize py-4 px-2.5'>{item.price}</td>
        <td className='text-center text-2xl py-4 px-2.5'>
            <Link to={`/products/${item._id}`}><i className='bx bx-edit'></i></Link>
            {
                isDeletingProduct && deletedProduct?._id === item._id
                ?
                 <ClipLoader color={"#ff5353"} />
                : 
                <Link onClick={() => deleteProduct({ id: item._id })}><i className='bx bx-trash'></i></Link>
            }
        </td>
    </tr>
)

    if (isLoading) return <PulseLoader color={"#ff5353"} />
    if (isError) return <div className='text-red-500'>{error}</div>

  return (
    <div>
        <div className='mb-8 flex justify-between items-center'>
            <h2 className='capitalize text-2xl font-semibold'>Sản phẩm</h2>
            <Link to='/products/add' className='bg-primary hover:opacity-75
            rounded-main text-white leading-3 py-4 px-7'>Thêm sản phẩm</Link>
        </div>

        <div>
            <div>
                <div className='p-7 mb-7 bg-mainBg rounded-main shadow-main-shadow'>
                    <div>
                        {
                            isSuccess && <Table
                                limit='10'
                                headData={productTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={products}
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

export default ProductList