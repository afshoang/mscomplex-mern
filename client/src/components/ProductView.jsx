import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, QuantityBox } from '../components';
import { addToCart } from '../app/features/cartSlice';
import { toast } from 'react-toastify';

const ProductView = ({ product }) => {
    const dispatch = useDispatch()

    const [mainImg, setMainImg] = useState(product?.img[0].url)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(undefined)
    const [size, setSize] = useState(undefined)

    const navigate = useNavigate()

    const handleAddToCart = (type) => { // type === 0 add to cart, 1 buy now
        if (!color || !size) {
            toast.error(`Bạn chưa chọn ${!color ? 'màu sắc' : !size ? 'kích thước' : ''} sản phẩm`)
            return
        }
        dispatch(addToCart({ product, quantity, color, size }))
        toast("Đã thêm vào giỏ hàng!")
        if (type === 1) {
            // buy now => navigate to cart
            setTimeout(() => {
                navigate('/cart')
            }, 300)
        }
    }

  return (
    <div className='flex flex-col lg:flex-row gap-10'>
        {/* PRODUCT IMG */}
        <div className='w-full lg:w-[60%] flex flex-col gap-8'>
            <div>
                <img src={mainImg} alt="" />
            </div>

            <div className='flex items-center gap-3'>
                {
                    product.img.map((item, index) => (
                        <div key={index} className='w-1/5 cursor-pointer' onClick={() => setMainImg(item.url)}>
                            <img src={item.url} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
        {/* END PRODUCT IMG */}
        {/* PRODUCT INFO */}
        <div>
            <h1 className='text-4xl'>{product.title}</h1>
            <div className='my-4'>
                <span className='text-primary text-2xl'>{`${new Intl.NumberFormat().format(product.price)}đ`}</span>
            </div>

            <div className='mb-5'>
                <div className='mb-5 text-xl font-bold'>
                    Màu sắc
                </div>

                <div className='flex gap-2'>
                    {
                        product?.color.map(item => <div 
                            className={`min-w-[50px] leading-10 text-center capitalize px-3 cursor-pointer border border-solid border-transparent
                             ${item === color ? 'bg-primary text-white' : 'bg-[#f6f6f6] text-[#62676D]'} rounded hover:bg-primary hover:text-white duration-200`}
                            onClick={() => setColor(item)}
                            key={item}
                        >
                            {item}
                        </div>)
                    }
                </div>
            </div>

            <div className='mb-5'>
                <div className='mb-5 text-xl font-bold'>
                    Kích thước
                </div>

                <div className='flex gap-3'>
                    {
                        product?.size.map(item => <div
                            className={`min-w-[50px] leading-10 text-center capitalize px-3 cursor-pointer border 
                            border-solid border-transparent ${item === size ? 'bg-primary text-white' : 'bg-[#f6f6f6] text-[#62676D]'} rounded hover:bg-primary hover:text-white duration-200`}
                            onClick={() => setSize(item)}
                            key={item}
                        >
                            {item}
                        </div>)
                    }
                </div>
            </div>

            <QuantityBox quantity={quantity} setQuantity={setQuantity} />

            <div className="flex gap-3 mt-5 text-white">
                <Button icon='bxs-cart-add' onClick={() => handleAddToCart(0)}>thêm vào giỏ</Button>
                <Button onClick={() => handleAddToCart(1)}>mua ngay</Button>
            </div>
        </div>
        {/* END PRODUCT INFO */}
    </div>
  )
}

export default ProductView