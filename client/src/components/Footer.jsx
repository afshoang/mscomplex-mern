
const Footer = () => {
    const footerAboutLinks = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    },
    {
        display: "Hệ thống cửa hàng",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/about"
    },
    {
        display: "Chính sách bảo hành",
        path: "/about"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/about"
    }
]
  return (
    <footer className="bg-[#e9e2d8] mb-3">
        <div className='container px-4 py-6 sm:py-12 border-b border-solid border-[#d6d8d9]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div>
                    <h4 className="uppercase mb-6 font-bold">Tổng đài hỗ trợ</h4>
                    <div>
                        <p className="mb-4">
                            Liên hệ đặt hàng <strong>0123456789</strong>
                        </p>
                        <p className="mb-4">
                            Thắc mắc đơn hàng <strong>0123456789</strong>
                        </p>
                        <p className="mb-4">
                            Góp ý, khiếu nại <strong>0123456789</strong>
                        </p>
                    </div>
                </div>
                <div>
                    <h4 className="uppercase mb-6 font-bold">Về MSCOMPLEX</h4>
                    <div>
                        {
                            footerAboutLinks.map((item, index) => (
                                <p className="mb-4" key={index}>
                                    {item.display}
                                    {/* <Link to={item.path}>
                                    </Link> */}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h4 className="uppercase mb-6 font-bold">Chăm sóc khách hàng</h4>
                    <div>
                        {
                            footerCustomerLinks.map((item, index) => (
                                <p className="mb-4" key={index}>
                                        {item.display}
                                    {/* <Link to={item.path}>
                                    </Link> */}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <a href="#"><h1 className='font-bold text-2xl mb-6'>MSCOMPLEX<span className='text-primary'>.</span></h1></a>
                    <p>
                        Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng Việt. Hãy cùng MsComplex hướng đến một cuộc sống năng động, tích cực hơn.
                    </p>
                </div>
            </div>
        </div>
        <p className="px-4 py-6 text-center">Made by HoangPham with <span className="text-primary"><i className='bx bxs-heart'></i></span></p>
    </footer>
  )
}

export default Footer