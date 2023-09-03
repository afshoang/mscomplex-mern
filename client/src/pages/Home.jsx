import { 
  HeroSlider, 
  PolicyCard, 
  Section, 
  SectionTitle, 
  SectionBody, 
  ProductCard
 } from '../components';
import { policy, products } from '../constants';

const Home = () => {
  return (
    <>
        <HeroSlider />

        {/* FETURED PRODUCT SECTION */}
        <Section>
          <SectionTitle>
              Sản phẩm nổi bật
          </SectionTitle>
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
                products.map(product => <ProductCard 
                  key={product.id}
                  img1={product.image01}
                  title={product.title}
                  price={product.price}
                />)
              }
            </div>
          </SectionBody>
        </Section>
        {/* END FETURED PRODUCT SECTION */}
    </>
  )
}

export default Home