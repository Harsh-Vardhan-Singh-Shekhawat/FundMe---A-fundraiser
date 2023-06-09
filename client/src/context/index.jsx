import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xff22D0E5f047b4E22EF10B9ab5456faB8C0A5a9c"
  ); // fundraising address of the smart contract created in thirdweb

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  // here we have to write functions in smart contract it is the way to call the write function using useContractWrite and it automatically takes all the paramter of the function

  const address = useAddress();
  const connectWallet = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [address, form.title, form.description, form.target, new Date(form.deadline).getTime(), form.image],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const getCampaigns = async () => {
    // console.log(pId)
    // const campaigns = await contract.call('donatorList', [pId]);
    const campaigns = await contract.call('donatorList');


    const parsedCampaigns = campaigns.map((campaign,i) => ({
        owner:campaign.owner,
        title: campaign.title,
        description:campaign.description,
        target:ethers.utils.formatEther(campaign.target.toString()),
        deadline:campaign.deadline.toNumber(),
        amountCollected:ethers.utils.formatEther(campaign.amountCollected.toString()),
        image:campaign.image,
        pId:i
    }))

    // console.log(parsedCampaigns);
    return (parsedCampaigns);
  }

  const getUserCampaign = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => (
      campaign.owner === address
    ))

    return filteredCampaigns;
  }

  const donate = async (pId,amount) => {
    
    const data = await contract.call('donateToCampaign', [pId], {
      value:ethers.utils.parseEther(amount)
    });
    // console.log(value)
    return data;  
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators',[pId]);
    const numberOfDonations = donations[0].length;
    
    const parsedDonations = [];

    for(let i = 0;i<numberOfDonations;i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donations: ethers.utils.formatEther(donations[1][i].toString())
      })
    }
     return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connectWallet,
        donate,
        getCampaigns,
        getUserCampaign,
        getDonations,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
