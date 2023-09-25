import { Outlet } from 'react-router-dom'
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className='min-h-screen pl-[300px] bg-secondBg'>
          <TopNav />
        <div className='p-7'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Layout