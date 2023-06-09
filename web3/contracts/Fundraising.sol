// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Fundraising {

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint => Campaign) public campaigns;

    uint public noOfCampaigns = 0; 

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {
        
        Campaign storage campaign = campaigns[noOfCampaigns];
        
        require(campaign.deadline < block.timestamp, "The deadline should be in the future!");
        
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        noOfCampaigns++;

        return noOfCampaigns - 1;
    }
    function donateToCampaign(uint256 _id) payable public {
        uint amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value:amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) public view returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators,campaigns[_id].donations); 
    }

    function donatorList() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaigns);

        for(uint i = 0; i< noOfCampaigns;i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}