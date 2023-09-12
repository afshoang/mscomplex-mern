import { 
  ProductCard,
  ProductView,
  Section, 
  SectionTitle, 
  SectionBody, 
 } from '../components';
 import { useParams } from 'react-router-dom';
 import { useGetProductQuery } from '../app/features/productsApiSlice';
 import { useTitle } from '../hooks';

const Product = () => {
  const { id } = useParams()
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductQuery(id)
  useTitle(`${product?.title}`)


  return (
    <div className='container px-4'>
      <Section>
        <SectionBody>
          { isSuccess && <ProductView product={product} /> }
        </SectionBody>
      </Section>
      {/* <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
              }
            </div>
          </SectionBody>
      </Section> */}
    </div>
  )
}

export default Product