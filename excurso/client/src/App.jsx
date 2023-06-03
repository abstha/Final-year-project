import * as React from 'react';
import Signup from './Pages/UserRegister/Signup'
import { Route, Routes} from 'react-router-dom';
import Landingpage from './Pages/Random pages/landingpage';
import MapPage from './Pages/UserMap/Map'
import Loginpage from './Pages/UserLogin/Loginpage';
import Mainpage from './Pages/UserMain/Mainpage';
import Bookmark from './Pages/bookmark/bookmark';
import ProtectedRoutes from './components/Protected/ProtectedRoutes';
import GProtectedRoutes from './components/Protected/ProtectedGuides';
import Addbm from './Pages/AddBm/AddBm';
import Admin from './Pages/Admin/Admin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Usertable from './components/Usertable/Usertable';
import Guides from './Pages/Dashboard/Dashboardpages/Guides';
import Destinations from './Pages/Dashboard/Dashboardpages/Destinations';
import GuidesPage from './Pages/GuidesBooking/Guides';
import GuidesLogin from './Pages/Guides/GuidesLogin/GuidesLogin';
import GuidesReg from './Pages/Guides/GuidesRegister/GuidesReg';
import GuidesMain from './Pages/Guides/GuidesPage/GuidesPage';
import GuidesRequests from './Pages/Guides/GuidesRequest/GuidesRequests'
import Requests from './Pages/UserRequests/Requests';
import Pins from './Pages/Dashboard/Dashboardpages/Pins';

const App = () => {
    return (
        
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/map' element={<MapPage/>}/>
                    <Route path ="/main" element={<Mainpage/>}/>
                    <Route path="/bookmark" element={<Bookmark/>}/>
                    <Route path="/Addbm" element={<Addbm/>}/>
                    <Route path = '/requests' element={<Requests/>}/>
                    <Route path="/GuidesPage" element={<GuidesPage/>}/>
                </Route>
                <Route element={<GProtectedRoutes/>}>
                    <Route path = '/guides/guidesRequests' element={<GuidesRequests/>}/>
                    <Route path = '/guides/guidesMain' element={<GuidesMain/>}/>
                    
                </Route>

                <Route path='/' element={<Signup/>} />
                <Route path='/landing' element={<Landingpage/>} />
                <Route path='/login' element={<Loginpage/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/admin/usertable' element={<Usertable/>}/>
                <Route path='/admin/guides' element={<Guides/>}/>
                <Route path='/admin/destinations' element={<Destinations/>}/>
                <Route path='/guides/login' element={<GuidesLogin/>}/>
                <Route path ='/guides/register' element={<GuidesReg/>}/>
                <Route path='/admin/pins' element={<Pins/>}/>
                
            </Routes>
        
    )
}
export default App;
