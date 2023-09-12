import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader'

import { setCredentials, selectCurrentToken } from '../app/features/authSlice';
import { useLoginMutation } from '../app/features/authApiSlice';
import { useTitle } from '../hooks';

const Login = () => {
    useTitle('Đăng nhập tài khoản')

    const token = useSelector(selectCurrentToken)

    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await login({ username, password }).unwrap()
            toast('Đăng nhập thành công!')
            dispatch(setCredentials(user))
            setUsername('')
            setPassword('')
            navigate('/')
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
    }

    const userRef = useRef(null)

     useEffect(() => {
        if (token) {
            navigate('/')
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

                <form className='flex flex-col gap-5' onSubmit={(e) => handleLogin(e)}>
                    <div>
                        <input 
                            className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                            text-sm border border-solid  border-[#EAEBF3] focus:border-[#8C8C8C] leading-10 px-4`}
                            value={username}
                            onChange={handleUsernameChange}
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
                            value={password}
                            onChange={handlePasswordChange}
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