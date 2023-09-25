import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader'

import { useAddNewImageMutation, useDeleteImageMutation } from '../features/upload/uploadApiSlice';
import { useGetProductQuery, useAddNewProductMutation, useUpdateProductMutation } from '../features/product/productsApiSlice';
import { CustomInput } from '../components';
import useTitle from '../hooks/useTitle';

const AddProduct = () => {
    let { id } = useParams();
    useTitle(`${id === 'add' ? 'Thêm' : 'Sửa'} sản phẩm`)

    const navigate = useNavigate()

    const [productImgs, setProductImgs] = useState([])

    const {
        data: product,
        // isLoading,
        isSuccess,
        // isError,
        // error
    } = useGetProductQuery(id, { skip: id === 'add' })
    
    const [addNewProduct, { isLoading: isAddingProduct, isSuccess: isSuccessAddProduct }] = useAddNewProductMutation()
    const [updateProduct, { isLoading: isUpdatingProduct, isSuccess: isSuccessUpdateProduct }] = useUpdateProductMutation()
    const [addNewImage, { isLoading: isUploadingImgs, isSuccess: isSuccessUploadImgs }] = useAddNewImageMutation()
    const [deleteImage, { data: deletedImg, isLoading: isDeletingImg, isSuccess: isSuccessDeleteImg}] = useDeleteImageMutation()

    useEffect(() => {
        if (isSuccessDeleteImg) {
            if (deletedImg?.id) {
                const filteredImgs = [...productImgs].filter(img => img.public_id !== deletedImg.id)
                setProductImgs(filteredImgs)
            }
        }
    }, [isSuccessDeleteImg, deletedImg?.id])

    const formik = useFormik({
        initialValues: {
            title: '',
            price: 0,
            description: '',
            quantity: 1,
            tags: '',
            color: '',
            size: '',
            categories: '',
        },
        validationSchema: Yup.object({
        title: Yup.string()
            .required('Vui lòng nhập tên sản phẩm!'),
        description: Yup.string()
            .required('Vui lòng nhập miêu tả sản phẩm!'),
        price: Yup.number()
            .required('Vui lòng nhập mật khẩu!'),
        tags: Yup.string(),
        color: Yup.string().required('Vui lòng nhập ít nhất 1 màu sắc!'),
        size: Yup.string().required('Vui lòng nhập ít nhất 1 kích thước!'),
        categories: Yup.string().required('Vui lòng nhập ít nhất 1 danh mục sản phẩm!'),
        }),
        onSubmit: async values => {
            try {
                const newProduct = {
                    ...values,
                    color: values.color.split(',').map(item => item.trim()),
                    size: values.size.split(',').map(item => item.trim()),
                    categories: values.categories.split(',').map(item => item.trim()),
                    img: productImgs
                }
                if (id === 'add') {
                    await addNewProduct(newProduct)
                } else {
                    await updateProduct({ id: product._id, data: newProduct })
                }
            } catch (err) {
                if (!err.status) {
                    toast.error('Server không trả lời!');
                } else if (err.status === 400) {
                    toast.error('Thiếu username hoặc password!');
                } else if (err.status === 401) {
                    toast.error('Username hoặc password không hợp lệ!');
                } else {
                    toast.error(err.data?.message);
                }
            }
        },
    });

    useEffect(() => {
        if (isSuccessAddProduct || isSuccessUpdateProduct) {
            toast(`${id === 'add' ? 'Thêm' : 'Sửa'} sản phẩm thành công!`)
            formik.resetForm();
            setProductImgs([])
            navigate('/products')
        }
    }, [isSuccessAddProduct, formik, isSuccessUpdateProduct, id, navigate])

    useEffect(() => {
        if (id !== 'add' && isSuccess) {
            formik.setFieldValue('title', product.title);
            formik.setFieldValue('description', product.description);
            formik.setFieldValue('price', product.price);
            formik.setFieldValue('quantity', product.quantity);
            formik.setFieldValue('tags', product.tags);
            formik.setFieldValue('categories', product?.categories?.join(', '));
            formik.setFieldValue('color', product.color?.join(', '));
            formik.setFieldValue('size', product.size?.join(', '));
            setProductImgs(product.img)
        }
    },[id, isSuccess, product])

    const onDrop = useCallback(async acceptedFiles => {
        // Do something with the files
       const uploadedProductImgs = await addNewImage(acceptedFiles).unwrap()
       setProductImgs([
            ...productImgs,
            ...uploadedProductImgs
        ])
    }, [productImgs, addNewImage, isSuccessUploadImgs])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
        <h2 className='capitalize text-2xl font-semibold mb-8'>{id === 'add' ? 'Thêm' : 'Sửa'} sản phẩm</h2>

        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.title} 
                    type='text'
                    name='title'
                    inputId='title'
                    label='Tên sản phẩm'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.title && formik.errors.title
                    }
                </div>

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.price} 
                    type='number'
                    name='price'
                    inputId='price'
                    label='Giá sản phẩm'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.price && formik.errors.price
                    }
                </div>

                <div className='mt-6'>
                    <ReactQuill 
                        theme="snow"
                        name="description"
                        value={formik.values.description} 
                        onChange={formik.handleChange('description')} />
                    <div className='text-red-500 mt-2 text-sm'>
                        { 
                            formik.touched.description && formik.errors.description
                        }
                    </div>
                </div>
                

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.quantity} 
                    type='number'
                    name='quantity'
                    inputId='quantity'
                    label='Số lượng sản phẩm (Ngăn cách bằng dấu phẩy)'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.quantity && formik.errors.quantity
                    }
                </div>

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.categories} 
                    type='text'
                    name='categories'
                    inputId='categories'
                    label='Danh mục sản phẩm(Ngăn cách bằng dấu phẩy)'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.categories && formik.errors.categories
                    }
                </div>

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.tags} 
                    type='text'
                    name='tags'
                    inputId='tags'
                    label='Nhãn sản phẩm(Ngăn cách bằng dấu phẩy)'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.tags && formik.errors.tags
                    }
                </div>

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.color} 
                    type='text'
                    name='color'
                    inputId='color'
                    label='Màu sắc sản phẩm(Ngăn cách bằng dấu phẩy)'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.color && formik.errors.color
                    }
                </div>

                <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.size} 
                    type='text'
                    name='size'
                    inputId='size'
                    label='Kích thước sản phẩm(Ngăn cách bằng dấu phẩy)'
                />
                <div className='text-red-500 mt-2 text-sm'>
                    { 
                        formik.touched.size && formik.errors.size
                    }
                </div>

                {
                    isUploadingImgs ?
                        <PulseLoader color={"#ff5353"} />
                    :
                    <div {...getRootProps({
                        className: 'mt-5 flex flex-col flex-1 items-center p-5 border-2 border-[#eee] border-dashed bg-white text-[#bdbdbd] rounded outline-none'
                    })}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Thả ảnh sản phẩm vào đây ...</p> :
                            <p>Kéo và thả ảnh sản phẩm vào đây, hoặc click để chọn ...</p>
                        }
                    </div>
                }
                <div className='my-3 flex flex-wrap gap-2'>
                    {
                        productImgs.length > 0 &&
                        productImgs.map((item, index) => <div key={index} className='relative'>
                            <button
                                type="button"
                                onClick={() => deleteImage({ id: item.public_id})}
                                disabled={isDeletingImg}
                                className="absolute top-0 right-0"
                            >
                                <i className='bx bx-trash text-xl text-red-600'></i>
                            </button>
                            <img src={item.url} className='w-[200px] h-[200px]' alt="uploaded image" />
                        </div>)
                    }
                </div>

                <button 
                    type='submit'
                    disabled={isAddingProduct}
                    className='bg-primary hover:opacity-75 rounded-main text-white py-2 px-7 mt-3'
                >
                    { id === 'add' ? 'Thêm' : 'Sửa' }
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct