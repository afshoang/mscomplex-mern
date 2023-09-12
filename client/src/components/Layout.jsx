import { Outlet } from 'react-router-dom'
import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <Announcement />
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    )
}
export default Layout