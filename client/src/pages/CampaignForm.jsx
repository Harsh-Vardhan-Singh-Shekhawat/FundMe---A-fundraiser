import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { ethers } from 'ethers'
import { useStateContext } from '../context'
import CustomButton from '../components/CustomButton'
import {thirdweb} from '../assets'
import { calculateBarPercentage, daysLeft } from '../utils'
const CampaignForm = () => {

  const state = useLocation();
  console.log(state);
  
  return (
    <div>
      CampaignForm
    </div>
  )
}

export default CampaignForm
