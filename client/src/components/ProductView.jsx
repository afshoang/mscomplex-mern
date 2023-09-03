import { useState } from 'react'
import { Button } from '../components';

const ProductView = props => {
    const product = props.product

    const [mainImg, setMainImg] = useState(product.image01)

    const [quantity, setQuantity] = useState(1)

    const [color, setColor] = useState(undefined)
    const [size, setSize] = useState(undefined)

    const handleUpdateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
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
                <div className='w-1/5 cursor-pointer' onClick={() => setMainImg(product.image01)}>
                    <img src={product.image01} alt="" />
                </div>
                <div className='w-1/5 cursor-pointer' onClick={() => setMainImg(product.image02)}>
                    <img src={product.image02} alt="" />
                </div>
            </div>
        </div>
        {/* END PRODUCT IMG */}
        {/* PRODUCT INFO */}
        <div>
            <h1 className='text-4xl'>{product.title}</h1>
            <div className='my-4'>
                <span className='text-primary text-2xl'>{product.price}</span>
            </div>

            <div className='mb-5'>
                <div className='mb-5 text-xl font-bold'>
                    Màu sắc
                </div>

                <div className='flex gap-2'>
                    {
                        product.colors.map(item => <div 
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
                        product.size.map(item => <div
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

            {/* #DEDDDD color disabled */}
            <div className='flex justify-start text-lg leading-9'> 
                <div 
                    onClick={() => handleUpdateQuantity('minus')}
                    className={`flex justify-center items-center w-[40px] h-[40px] rounded-tl 
                    rounded-bl border border-solid border-[#D9D9D9] ${quantity > 1 ? 'cursor-pointer text-black' : 'cursor-default text-[#DEDDDD]'}`}
                >
                    <i className='bx bx-minus'></i>
                </div>
                <div className='flex justify-center items-center w-[40px] h-[40px] border border-solid border-[#D9D9D9] leading-4'>
                    {quantity}
                </div>
                <div 
                onClick={() => handleUpdateQuantity('plus')}
                className='flex justify-center items-center w-[40px] h-[40px] rounded-tr rounded-br border border-solid border-[#D9D9D9] cursor-pointer'>
                    <i className='bx bx-plus'></i>
                </div>
            </div>

            <div className="flex gap-3 mt-5 text-white">
                <Button icon='bxs-cart-add' onClick={() => console.log('add to cart')}>thêm vào giỏ</Button>
                <Button onClick={() => console.log('go to cart')}>mua ngay</Button>
            </div>
        </div>
        {/* END PRODUCT INFO */}
    </div>
  )
}

export default ProductView