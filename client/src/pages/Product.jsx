import React from 'react'
import { products } from '../constants';
import { 
  ProductCard,
  ProductView,
  Section, 
  SectionTitle, 
  SectionBody, 
 } from '../components';
 import { useParams } from 'react-router-dom';

const Product = () => {
  const { slug } = useParams()
  console.log("🚀 ~ file: Product.jsx:13 ~ Product ~ slug:", slug)
   const product = products.find(product => product.slug === slug)

  return (
    <div className='container px-4'>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
                products.map(product => <ProductCard 
                  key={product.id}
                  img1={product.image01}
                  title={product.title}
                  price={product.price}
                  slug={product.slug}
                />)
              }
            </div>
          </SectionBody>
      </Section>
    </div>
  )
}

export default Product