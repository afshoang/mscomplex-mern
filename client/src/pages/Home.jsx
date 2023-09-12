import PulseLoader from 'react-spinners/PulseLoader'
import { 
  HeroSlider, 
  PolicyCard, 
  Section, 
  SectionTitle, 
  SectionBody, 
  ProductCard
 } from '../components';
import { policy } from '../constants';
import { useGetProductsQuery } from '../app/features/productsApiSlice';
import { useTitle } from '../hooks';

const Home = () => {
  useTitle('MSCOMPLEX - Mặc mỗi ngày')
  const {
    data: featuredProducts,
    isLoading: isLoadingFeaturedProducts,
    isSuccess: isSuccessFeaturedProducts,
    // isError,
    // error
  } = useGetProductsQuery({ tags: ["featured"] }) // get featured product

  const {
    data: bestSellerProducts,
    isLoading:isLoadingBestSellerProducts,
    isSuccess:isSuccessBestSellerProducts,
    // isError,
    // error
  } = useGetProductsQuery({ tags: ["best-seller"] }) // get featured product

  return (
    <>
        <HeroSlider />

        {/* FETURED PRODUCT SECTION */}
        <Section>
          <SectionTitle>
              Sản phẩm nổi bật
          </SectionTitle>
          <SectionBody>
            { isLoadingFeaturedProducts && <PulseLoader color={"#ff5353"} /> }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
               isSuccessFeaturedProducts && featuredProducts.map(product => <ProductCard key={product._id} product={product} />)
              }
            </div>
          </SectionBody>
        </Section>
        {/* END FETURED PRODUCT SECTION */}

        {/* POLICY SECTION */}
        <Section>
          <SectionBody>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                  policy.map((item, index) => <PolicyCard 
                    key={index}
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  />)
                }
              </div>
          </SectionBody>
        </Section>
        {/* END POLICY SECTION */}

        {/* FETURED PRODUCT SECTION */}
        <Section>
          <SectionTitle>
              Top sản phẩm bán chạy
          </SectionTitle>
          <SectionBody>
            { isLoadingBestSellerProducts && <PulseLoader color={"#ff5353"} /> }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
                isSuccessBestSellerProducts && bestSellerProducts?.map(product => <ProductCard key={product._id} product={product} />)
              }
            </div>
          </SectionBody>
        </Section>
        {/* END FETURED PRODUCT SECTION */}
    </>
  )
}

export default Home