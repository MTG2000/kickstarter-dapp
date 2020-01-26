pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Campaign is Ownable {
    enum State {Successeded, Failed, Running}

    // Game's info:
    string public gameTitle = "game title";
    string public description = "some descrition for the game";
    string public imgUrl = "";

    uint256 public goal;
    uint256 public endTime;
    uint256 public totalFunds = 0;
    State public state = State.Running;
    mapping(address => uint256) funds;

    function checkState() private {
        //if campaign ended & the state hasnt been set yet , set the new state
        if (state == State.Running && now > endTime) {
            if (totalFunds >= goal) state = State.Successeded;
            else state = State.Failed;
        }
    }

    modifier inState(State _state, string memory _msg) {
        checkState();
        require(state == _state, _msg);
        _;
    }

    modifier notInState(State _state, string memory _msg) {
        checkState();
        require(state != _state, _msg);
        _;
    }

    constructor(
        string memory _gameTitle,
        string memory _description,
        string memory _imgUrl,
        uint256 _goal,
        uint256 _campaignDuration,
        address _owner
    ) public {
        require(
            _campaignDuration > 0,
            "the campaign duration has to be greater than 0"
        );
        require(_goal > 0, "the campaign goal has to be greater than zero");
        transferOwnership(_owner);
        gameTitle = _gameTitle;
        description = _description;
        imgUrl = _imgUrl;
        goal = _goal;
        endTime = now + _campaignDuration;
    }

    function fund()
        external
        payable
        notInState(State.Failed, "Campaign Failed")
    {
        require(msg.value > 250 * (10**14), "The minimum funds are 1$");
        require((msg.sender) != owner(), "Owner cant fund his own campaign");
        funds[msg.sender] += msg.value;
        totalFunds += msg.value;
    }

    function refund() external inState(State.Failed, "Campaign didnt fail") {
        require(funds[msg.sender] > 0, "There is no funds for this address");
        uint256 amount = funds[msg.sender];
        funds[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success, "transfer failed");
    }

    //Owner of campaign calls this func to take the money from the contract if the campaign successed
    function withdraw()
        external
        onlyOwner
        inState(State.Successeded, "Campaign didnt successed")
    {
        (bool success, ) = msg.sender.call.value(address(this).balance)("");
        require(success, "transfer failed");
    }

}
