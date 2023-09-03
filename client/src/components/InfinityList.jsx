import { useState } from 'react'
import { ProductCard } from '../components';

const InfinityList = props => {
    const [loading, setLoading] = useState(true)
    const PRELOAD = 6

  return (
    <div className='flex-1 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
            props.data.map(product => <ProductCard 
            key={product.id}
            img1={product.image01}
            title={product.title}
            price={product.price}
            />)
        }
    </div>
  )
}

export default InfinityList