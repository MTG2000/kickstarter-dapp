pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Campaign.sol";

contract CampaignFactory is Ownable {
    uint256 public campaignPrice = (1 ether) / 2;
    address[] public campaignAddresses;
    uint256 public campaignsCount = 0;

    function newCampaign(
        string calldata _title,
        string calldata _description,
        string calldata _imgUrl,
        uint256 _goal,
        uint256 _campaignDuration
    ) external payable {
        require(
            msg.value >= campaignPrice,
            "not enough funds to post a new campaign"
        );
        Campaign _newCampaign = new Campaign(
            _title,
            _description,
            _imgUrl,
            _goal,
            _campaignDuration,
            msg.sender
        );
        campaignAddresses.push(address(_newCampaign));
        campaignsCount++;
    }

}
