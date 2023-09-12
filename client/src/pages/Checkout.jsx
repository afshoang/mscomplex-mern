import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader'

import { 
  selectCartItems, 
  selectCartQuantity, 
  selectCartTotalPrice,
  resetCart
} from '../app/features/cartSlice';
import { selectCurrentUser } from '../app/features/authSlice';
import { useCreateOrderMutation } from '../app/features/ordersApiSlice';
import { useTitle } from '../hooks';

import data from '../assets/vietnam.json';
import formatMoney from '../utils/formatMoney';

const Checkout = () => {
    useTitle('Thanh toán đơn hàng')

  const SHIPPING_PRICE = 20000
  const cartItems = useSelector(selectCartItems)
  const cartQuantity = useSelector(selectCartQuantity)
  const cartTotalPrice = useSelector(selectCartTotalPrice)
  const currentUser = useSelector(selectCurrentUser)

  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const shippingForm = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      notes: "",
      paymentMethod: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên!"),
      phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại!"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"),
      city: Yup.string().required("Vui lòng chọn tỉnh thành"),
      district: Yup.string().required("Vui lòng chọn quận huyện"),
      ward: Yup.string().required("Vui lòng chọn phường xã"),
      notes: Yup.string(),
      paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán!"),
    }),
    onSubmit: async values => {
      try {
       const order = await createOrder({
          shippingInfo: values,
          orderItems: cartItems.map(item => {
             return {
              ...item,
              product: item.product._id,
            }
          }),
          totalPrice: cartTotalPrice + SHIPPING_PRICE
        }).unwrap()

        if (order.message === "success") {
          toast('Đặt hàng thành công!')
          dispatch(resetCart())
          setTimeout(() => {
            navigate('/')
          },300)
        }

      } catch (error) {
        toast.error(error.data?.message);
      }
    }
  });
 
  if (isLoading) return <PulseLoader color={"#ff5353"} />

  return (
    <div className='container py-5 px-3'>
      <header className='hidden lg:flex justify-center pb-3'>
        <Link to="/"><h1 className='font-bold text-2xl'>MSCOMPLEX<span className='text-primary'>.</span></h1></Link>
      </header>
      <div className='flex flex-col-reverse lg:flex-row lg:h-screen lg:gap-10'>
        <main className='flex-[2] bg-gray pt-10 lg:pt-0'>
          <div className='flex flex-col lg:flex-row gap-5'>
            <div className='flex-1'>
              <h2 className="font-bold text-lg mb-3">Thông tin giao hàng</h2>

              <p className='mb-3'>{currentUser.username} ({currentUser.email})</p>

              <form>
                <div className='w-full p-1'>
                  <input
                    name='fullName'
                    value={shippingForm.values.fullName}
                    onChange={shippingForm.handleChange}
                    className='w-full rounded p-3.5 text-sm border border-solid 
                    border-[#d9d9d9] h-[44px] bg-white text-black outline-none focus:border-primary' 
                    placeholder='Họ và tên' 
                    type="text" 
                  />
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.fullName && shippingForm.errors.fullName
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <input
                    name='phoneNumber'
                    value={shippingForm.values.phoneNumber}
                    onChange={shippingForm.handleChange}
                    className='w-full rounded p-3.5 text-sm border border-solid 
                    border-[#d9d9d9] h-[44px] bg-white text-black outline-none focus:border-primary' 
                    placeholder='Số điện thoại' type="tel" 
                  />
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.phoneNumber && shippingForm.errors.phoneNumber
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <input
                    name='address'
                    value={shippingForm.values.address}
                    onChange={shippingForm.handleChange}
                    className='w-full rounded p-3.5 text-sm border border-solid 
                    border-[#d9d9d9] h-[44px] bg-white text-black outline-none focus:border-primary' 
                    placeholder='Địa chỉ' type="text" 
                  />
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.address && shippingForm.errors.address
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <select 
                    name='city'
                    value={shippingForm.values.city}
                    onChange={shippingForm.handleChange}
                    className='w-full p-3.5 border border-solid rounded text-sm border-[#d9d9d9]' 
                    id="city"
                  >
                    <option value="" defaultValue disabled>Chọn tỉnh thành</option>
                    {
                      data.map((dis, index) => <option key={index} value={dis.Name}>{dis.Name}</option>)
                    }
                  </select>
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.city && shippingForm.errors.city
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <select
                    name='district'
                    value={shippingForm.values.district}
                    onChange={shippingForm.handleChange}
                    disabled={!shippingForm.values.city}
                    className='w-full p-3.5 border border-solid rounded text-sm border-[#d9d9d9]' 
                    id="district">
                    <option value="" defaultValue disabled>Chọn quận huyện</option>
                    {
                      shippingForm.values.city && 
                        data.find(item => item.Name === shippingForm.values.city)?.Districts
                          .map(item => <option key={item.Id} value={item.Name}>{item.Name}</option>)
                    }
                  </select>
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.district && shippingForm.errors.district
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <select
                    name='ward'
                    value={shippingForm.values.ward}
                    onChange={shippingForm.handleChange}
                    disabled={!shippingForm.values.district}
                    className='w-full p-3.5 border border-solid rounded text-sm border-[#d9d9d9]' 
                    id="ward"
                  >
                    <option value="" defaultValue disabled>Chọn phường xã</option>
                    {
                      shippingForm.values.district && 
                        data.find(item => item.Name === shippingForm.values.city)?.Districts
                            .find(item => item.Name === shippingForm.values.district)?.Wards
                            .map(item => <option key={item.Id} value={item.Name}>{item.Name}</option>)
                    }
                  </select>
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.ward && shippingForm.errors.ward
                    }
                  </div>
                </div>
                <div className='w-full p-1'>
                  <textarea
                    name='notes'
                    value={shippingForm.values.notes}
                    onChange={shippingForm.handleChange}
                    className='w-full rounded p-3.5 text-sm border border-solid 
                    border-[#d9d9d9] h-[44px] bg-white text-black outline-none focus:border-primary' 
                    placeholder='Ghi chú(tùy chọn)' type="text" 
                  />
                  <div className='text-red-500'>
                    { 
                      shippingForm.touched.notes && shippingForm.errors.notes
                    }
                  </div>
                </div>
              </form>
            </div>

            <div className='flex-1'>
              <h2 className="font-bold text-lg mb-3">Phương thức thanh toán</h2>
              <div className='border border-solid border-[#cecdcd] text-[#545454] rounded-md'>
                <div className='p-3.5'>
                  <input
                    name='paymentMethod'
                    value="bank"
                    checked={shippingForm.values.paymentMethod === 'bank'}
                    onChange={shippingForm.handleChange}
                    className='mr-2' 
                    type="radio" 
                    id="bank" 
                  />
                  <label htmlFor="bank">Chuyển khoản</label>
                  
                </div>
                <div className='p-3.5'>
                  <input 
                    name='paymentMethod'
                    value="cod"
                    checked={shippingForm.values.paymentMethod === 'cod'}
                    onChange={shippingForm.handleChange}
                    className='mr-2' 
                    type="radio" 
                    id="cod"
                  />
                  <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                </div>
              </div>
              <div className='text-red-500'>
                { 
                  shippingForm.touched.paymentMethod && shippingForm.errors.paymentMethod
                }
              </div>
            </div>
          </div>
        </main>
        <aside className='flex-1'>
          <h2 className='font-bold text-lg'>Đơn hàng ({cartQuantity} sản phẩm)</h2>
          <div className='border-b border-solid border-gray-300 py-4'>
            {
              cartItems?.map(item => <div key={item.product._id} className='flex gap-10 items-center justify-between mt-3'>
                <div className='w-72 flex gap-5'>
                  <div className='w-[50px] h-[50px] relative'>
                    <div className='w-full h-full overflow-hidden relative'>
                      <img className='absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full' 
                        src={item.product.img[0].url} 
                        alt={item.product.title}
                      />
                    </div>
                    <span className='absolute -top-2 right-2 bg-primary text-[10px] rounded-[50%] px-1.5 text-center leading-5 h-5'>
                      {item.quantity}
                    </span>
                  </div>
                  <div className='flex-grow'>
                    <h5>{item.product.title}</h5>
                    <p className='text-[12px] text-[#969696]'><span className='capitalize'>{item.color}</span> / <span className='uppercase'>{item.size}</span></p>
                  </div>
                </div>
                <div>
                  <h5>{formatMoney(item.product.price * item.quantity)}</h5>
                </div>
            </div>)
            }
          </div>
          <div className='border-b border-solid border-gray-300 py-4'>
            <div className='flex justify-between'>
              <p>Tạm tính</p>
              <p>{formatMoney(cartTotalPrice)}</p>
            </div>
            <div className='flex justify-between pb-3'>
              <p>Phí vận chuyển</p>
              <p>{formatMoney(SHIPPING_PRICE)}</p>
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <h4 className='font-bold text-lg'>Tổng cộng</h4>
            <p className='font-bold'>{formatMoney(cartTotalPrice + SHIPPING_PRICE)}</p>
          </div>
          <div className='flex justify-between'>
            <Link to="/cart" className='flex items-center text-primary hover:opacity-60'><i className='bx bx-chevron-left'></i>Quay về giỏ hàng</Link>
            <button className='bg-primary py-3 px-6 rounded hover:opacity-60' type='submit' onClick={shippingForm.handleSubmit}>Đặt hàng</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout