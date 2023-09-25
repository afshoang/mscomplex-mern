import { sideBarRoutes } from '../assets/constant';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const location = useLocation()

  const activeItem = sideBarRoutes.findIndex(item => item.route === `/${location.pathname?.split('/')[1]}`)

  return (
    <div className='min-w-[300px] h-screen fixed top-0 left-0 bg-mainBg shadow-main-shadow'>
      <div className='h-[150px] flex justify-center items-center'>
        <Link to='/dashboard'><h1 className='font-bold text-2xl'>MSCOMPLEX<span className='text-primary'>.</span></h1></Link>
      </div>

      {
        sideBarRoutes.map((item, index) => (
          <Link to={item.route} key={index}>
            <SidebarItem 
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))
      }
    </div>
  )
}

export default Sidebar