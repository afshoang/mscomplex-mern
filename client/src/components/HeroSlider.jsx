import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SLIDE1 from '../assets/images/slider/slide_1.png'
import SLIDE2 from '../assets/images/slider/slide_2.png'
import SLIDE3 from '../assets/images/slider/slide_3.png'

const HeroSlider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate()

    const handleChangeSlide = useCallback((typeChange) => {
        if (typeChange === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }, [slideIndex])

    useEffect(() => {
        const slideAuto = setInterval(() => {
                handleChangeSlide("right")
            }, 4500);
            return () => {
                clearInterval(slideAuto)
            }
    }, [handleChangeSlide])


    const slideItems = [
    {
      id: 1,
      img: SLIDE1,
      title: "SUMMER SALE",
      desc: "Giảm 50% đồ hè",
      bg: "f5fafd",
    },
    {
      id: 2,
      img: SLIDE2,
      title: "AUTUMN COLLECTION",
      desc: "Đừng bỏ lỡ bộ sưu tập mùa thu 2023",
      bg: "fcf1ed",
    },
    {
      id: 3,
      img: SLIDE3,
      title: "OFFICE COLLECTION",
      desc: "Hàng hiệu đi làm, thoải mái cả ngày",
      bg: "fbf0f4",
    },
  ];


  return (
    <div className='w-full h-screen flex relative overflow-hidden'>
        <div 
        onClick={() => handleChangeSlide("left")}
        className='absolute top-0 bottom-0 left-3 m-auto w-[50px] h-[50px] bg-[#fff7f7]
        rounded-[50%] flex justify-center items-center cursor-pointer hover:bg-primary bg-opacity-50 z-[2]'>
            <i className='bx bxs-chevron-left'></i>
        </div>
        <div 
            className={`h-full flex transition-all transform ease-in duration-500`} 
            style={{ transform: `translateX(${slideIndex === 0 ? `0vw` : `${slideIndex * -100}vw`})` }}
        >
            {
                slideItems.map(item => (
                    <div 
                        key={item.id} 
                        className={`w-screen h-screen flex max-md:flex-col items-center`}
                        style={{ backgroundColor: `#${item.bg}` }}
                    >
                        <div className='h-[70%] md:h-full flex-1 flex justify-center items-center'>
                            <img className='h-[80%]' src={item.img} alt="S" />
                        </div>
                        <div className='flex-1 flex flex-col p-5 md:p-12 gap-3'>
                            <h1 className='text-3xl md:text-[58px] leading-[70px] font-medium'>{item.title}</h1>
                            <p className='uppercase'>{item.desc}</p>
                            <button onClick={() => navigate('/products')} className='bg-primary hover:bg-white hover:text-[#0056b3] rounded text-white leading-3 uppercase py-5 px-6 max-w-[170px]'>Mua ngay</button>
                        </div>
                    </div>
                ))
            }
            
            
        </div>
        <div 
        onClick={() => handleChangeSlide("right")}
        className='absolute top-0 bottom-0 right-3 m-auto w-[50px] h-[50px] bg-[#fff7f7]
        rounded-[50%] flex justify-center items-center cursor-pointer hover:bg-primary bg-opacity-50 z-[2]'>
            <i className='bx bxs-chevron-right'></i>
        </div>
    </div>
  )
}

export default HeroSlider