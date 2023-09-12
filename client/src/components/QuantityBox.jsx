import { useState } from 'react'

const QuantityBox = ({ quantity, setQuantity }) => { // 2props quantity, handleChangeQuantity
    // const [quantity, setQuantity] = useState(qty)

    const handleUpdateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

  return (
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
  )
}

export default QuantityBox