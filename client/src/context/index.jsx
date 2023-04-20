import React, {useContext, createContext} from 'react'
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import {ethers} from 'ethers'

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0xff22D0E5f047b4E22EF10B9ab5456faB8C0A5a9c'); // fundraising address of the smart contract created in thirdweb

    const {mutateAsync : createCampaign} = useContractWrite(contract, 'createCampaign')
    // here we have to write functions in smart contract it is the way to call the write function using useContractWrite and it automatically takes all the paramter of the function

    const address = useAddress();
    const connectWallet = useMetamask();

    const publishCampaign = async (form) => {
       try {
        const data = await createCampaign(
            address, //owner's address
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image

        )
        console.log("contract call success",data)
       } catch (error) {
        console.log("contract call failed",error)
        
       }
    }

    return (
        <StateContext.Provider 
            value={{
                address,
                contract, 
                createCampaign: publishCampaign
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

