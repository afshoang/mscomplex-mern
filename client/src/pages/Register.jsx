import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'react-toastify';

import { useRegisterMutation } from '../app/features/authApiSlice';
import { useTitle } from '../hooks';

const USER_REGEX = /^[A-z0-9]{3,20}$/
const EMAIL_REGEX = /.+@[^@]+\.[^@]{2,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {
    useTitle('Đăng ký tài khoản')

    const [register, {
        isLoading,
    }] = useRegisterMutation()
    
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    const handleUsernameChange = e => setUsername(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const canRegister = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await register({ username, email, password }).unwrap()
            toast('Đăng kí thành công!')
            setUsername('')
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch (err) {
            toast.error(err.data?.message);
        }
    }

    if (isLoading) return <PulseLoader color={"#ff5353"} />
  return (
    <div className='bg-login'>
        <div className='container px-4 mb-5 w-screen h-screen flex justify-center items-center'>
            <div className='w-[648px] max-w-full bg-white p-20'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Đăng ký</h1>

                <form className='flex flex-col gap-5' onSubmit={(e) => handleRegister(e)}>
                    <div>
                        <input 
                            className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                            text-sm border border-solid  ${username && !validUsername ? 'border-red-500' : 'border-[#EAEBF3] focus:border-[#8C8C8C]' } leading-10 px-4`}
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder='Username' 
                            type="text"
                            autoComplete="off"
                        />
                        <p className={`${username && !validUsername ? 'block' : 'hidden'} text-sm text-red-500 mt-1`}>Username phải có 3-20 kí tự</p>
                    </div>

                        <div>
                            <input 
                                className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                                text-sm border border-solid  ${email && !validEmail ? 'border-red-500' : 'border-[#EAEBF3] focus:border-[#8C8C8C]' } leading-10 px-4`}
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="off"
                                placeholder='Email' 
                                type="text" 
                            />
                            <p className={`${email && !validEmail ? 'block' : 'hidden'} text-sm text-red-500 mt-1`}>Email không hợp lệ!</p>
                        </div>
                    

                        <div>
                            <input 
                                className={`h-[48px] m-h-[40px] rounded focus:outline-none w-full
                                text-sm border border-solid  ${password && !validPassword ? 'border-red-500' : 'border-[#EAEBF3] focus:border-[#8C8C8C]'} leading-10 px-4`}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder='Password' 
                                type="password" 
                                autoComplete="off"
                            />
                            <p className={`${password && !validPassword ? 'block' : 'hidden'} text-sm text-red-500 mt-1`}>Mật khẩu phải có 4-12 kí tự</p>
                        </div>
                    
                
                    <button
                        className={`btn ${canRegister ? 'bg-primary hover:opacity-60' : 'bg-secondary'} color-[#1C2430] duration-150 p-3 rounded text-sm leading-4 capitalize`}
                        type='submit'
                        disabled={!canRegister}
                    >
                        Đăng ký
                    </button>
                </form>

                <div className="mt-5">
                    <span>Bạn đã có tài khoản?</span><Link className="text-primary font-bold ml-1 hover:underline" to="/login">Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register