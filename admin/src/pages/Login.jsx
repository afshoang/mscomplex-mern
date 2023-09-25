import { useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
 import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader'

import { setCredentials, selectCurrentToken } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import useTitle from '../hooks/useTitle';

const Login = () => {
    useTitle('Đăng nhập tài khoản')

    const token = useSelector(selectCurrentToken)

    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
        username: Yup.string()
            .required('Vui lòng nhập tài khoản!'),
        password: Yup.string()
            .required('Vui lòng nhập mật khẩu!'),
        }),
        onSubmit: async values => {
            try {
                const user = await login(values).unwrap()
                toast('Đăng nhập thành công!')
                dispatch(setCredentials(user))
            } catch (err) {
                if (!err.status) {
                    toast.error('Server không trả lời!');
                } else if (err.status === 400) {
                    toast.error('Thiếu username hoặc password!');
                } else if (err.status === 401) {
                    toast.error('Username hoặc password không hợp lệ!');
                } else {
                    toast.error(err.data?.message);
                }
            }
        },
    });

    const userRef = useRef(null)

     useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [token, navigate])

    useEffect(() => {
        userRef.current.focus()
    }, [])

    if (isLoading) return <PulseLoader color={"#ff5353"} />

  return (
    <div className='bg-login'>
        <div className='container px-4 mb-5 w-screen h-screen flex justify-center items-center'>
            <div className='w-[648px] max-w-full bg-white p-6 md:p-20'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Đăng nhập</h1>

                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <div>
                        <input 
                            className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                            text-sm border border-solid  border-[#EAEBF3] focus:border-[#8C8C8C] leading-10 px-4`}
                            id='username'
                            name='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            ref={userRef}
                            placeholder='Username' 
                            type="text"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div>
                        <input 
                            className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                            text-sm border border-solid  border-[#EAEBF3] focus:border-[#8C8C8C] leading-10 px-4`}
                            id='password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder='Password' 
                            type="password" 
                            autoComplete="off"
                            required
                        />
                    </div>
                    
                
                    <button
                        className={`btn bg-primary hover:opacity-60 color-[#1C2430] duration-150 p-3 rounded text-sm leading-4 capitalize`}
                        type='submit'
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="mt-5">
                    <span>Bạn chưa có tài khoản?</span><Link className="text-primary font-bold ml-1 hover:underline" to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login