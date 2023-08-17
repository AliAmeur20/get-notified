import {BrowserRouter, Routes, Route , Navigate}  from 'react-router-dom'
import Signin from "./pages/signin"
import FirstPage from "./pages/FirstPage"
import UserProfile from './pages/userProfile';
import { useAuthContext } from './hooks/useAuthContext';
import Register from './pages/Register';
import User from './pages/User';
import Streamer from './pages/Streamer';
import ChannelDetUser from './pages/channelDetailesUser';
import StreamerProfile from './pages/streamerProfile';
import ChannelDetStreamer from './pages/channelDetailesStreamer';
import Admin from './pages/Admin';
import AdminProfile from './pages/adminProfile';
import AdminChannels from './pages/adminChannels';
import ChannelDetAdmin from './pages/channelDetailesAdmin';
import AdminUsers from './pages/adminUsers';
import AdminChReq from './pages/adminChannelRequests';
import AdminFeedback from './pages/adminFeedback';
import AdminReports from './pages/adminreports';




function App() {
  const {user} = useAuthContext ()
  
  return (
    <div className="app">
    <BrowserRouter>
   
   <div className="pages">

    <Routes>

    <Route
     path='/'
     element={!user ? <FirstPage/>: <Navigate to={`/${user.role}`}/> }
      />

      <Route
     path='/user'
     element= {user ? <User/> : <Navigate to="/Signin" /> }
      />

      <Route
     path='/user/profile/:id'
     element={user ? <UserProfile/> : <Navigate to='/Signin' /> }
      />

       <Route 
      path='/user/channel/:id'
      element={user ? <ChannelDetUser /> : <Navigate to='/Signin' /> }
      />

      <Route
     path='/streamer'
     element= {user ? <Streamer/> : <Navigate to="/Signin" /> }
      />

       <Route
     path='/streamer/profile/:id'
     element={user ? <StreamerProfile/> : <Navigate to='/Signin' /> }
      />

       <Route 
      path='/streamer/channel/:id'
      element={user ? <ChannelDetStreamer /> : <Navigate to='/Signin' /> }
      />
      
      <Route 
      path='/Signin'
      element={!user ? <Signin /> : <Navigate to={`/${user.role}`} /> }
      />

      <Route 
      path='/Register/:role'
      element={!user ? <Register /> : <Navigate to={`/${user.role}`} /> }
      />

      <Route
     path='/admin'
     element= {user ? <Admin/> : <Navigate to="/Signin" /> }
      />

      <Route
     path='/admin/profile/:id'
     element={user ? <AdminProfile/> : <Navigate to='/Signin' /> }
      />

      <Route
     path='/admin/channels'
     element= {user ? <AdminChannels/> : <Navigate to="/Signin" /> }
      />

       <Route 
      path='/admin/channel/:id'
      element={user ? <ChannelDetAdmin /> : <Navigate to='/Signin' /> }
      />

       <Route 
      path='/admin/users'
      element={user ? <AdminUsers /> : <Navigate to='/Signin' /> }
      />

      <Route
     path='/admin/channelRequests'
     element= {user ? <AdminChReq /> : <Navigate to="/Signin" /> }
      />

      <Route
     path='/admin/feedback'
     element= {user ? <AdminFeedback /> : <Navigate to="/Signin" /> }
      />

      <Route
     path='/admin/reports'
     element= {user ? <AdminReports /> : <Navigate to="/Signin" /> }
      />
    
    </Routes>

    </div>

    </BrowserRouter>
    </div>
  );
}

export default App;
