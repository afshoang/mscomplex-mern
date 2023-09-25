import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../features/auth/authSlice';
import Dropdown from './Dropdown';
import HoangPham from '../assets/images/HoangPham.jpg';

const renderUserToggle = (user) => (
    <div className="flex items-center">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden mr-2.5">
            <img src={user?.image ? user?.image : HoangPham} alt="User image" />
        </div>
        <div className="text-base capitalize font-bold">
            {user?.username}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link onClick={item.onClick} key={index}>
        <div className="flex items-center p-4 hover:bg-secondBg">
            <i className={`${item.icon} mr-5 text-xl`}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const TopNav = () => {
    const user = useSelector(selectCurrentUser)

    const dispatch = useDispatch()
  return (
    <div className='p-8 h-[110px] flex justify-between items-center'>
        <div className='relative h-[50px] bg-mainBg flex items-center shadow-main-shadow rounded-main overflow-hidden'>
            <input 
                type="text" 
                placeholder='Tìm kiếm...'
                className='h-full w-full py-2.5 pr-[60px] pl-5 text-base rounded-main text-txtColor bg-mainBg'
            />
            <i className='bx bx-search text-2xl absolute right-[20px]'></i>
        </div>
        <div className='flex items-center'>
            <div className='ml-7'>
                <Dropdown
                    customToggle={() => renderUserToggle(user)}
                    contentData={[
                        // {
                        //     icon : "bx bx-user",
                        //     content: "Profile"
                        // },
                        {
                            icon : "bx bx-log-out-circle bx-rotate-180",
                            content: "Logout",
                            onClick: () => dispatch(logOut())
                        }
                    ]}
                    renderItems={(item, index) => renderUserMenu(item, index)}
                />
            </div> 
        </div>
    </div>
  )
}

export default TopNav