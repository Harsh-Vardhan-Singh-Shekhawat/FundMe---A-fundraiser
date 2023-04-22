import React from 'react'
import {Route , Routes} from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import NoPageFound from './pages/NoPageFound';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'
import CampaignForm from './pages/CampaignForm';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#fff] min-h-screen flex flex-row" >
      <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
      </div>
      
      <div className='flex-1 max-sm:pr-5 max-w-[1280px] mx-auto sm:pr-5'>
            <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/create-campaign" element={<CreateCampaign/>}/>
          <Route path="/campaign-details/:id" element={<CampaignDetails />}/>
          <Route path='*' element={<NoPageFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
