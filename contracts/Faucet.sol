// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    event Transfer(address indexed from , address indexed to, uint256 amount);
}

contract Faucet {
    IERC20 public samadaToken;
    address payable public owner;
    uint public lockTime = 1 minutes;
    uint public widthdrawalAmount = 20 * (10**18);
    mapping(address => uint) nextAccessTime;

    event Deposit(address _from, uint _amount);
    event Withdrawl(address _to, uint _amount); 

    
    constructor(address _samadaToken) payable {
        samadaToken = IERC20(_samadaToken);
        owner = payable(msg.sender);
    }

    function requestToken() external {
        require(msg.sender != address(0), "Non Valid Address");
        require(samadaToken.balanceOf(address(this)) >= widthdrawalAmount, "Not sufficiant balance from the Faucet");
        require(block.timestamp > nextAccessTime[msg.sender], "You can't request tokens for now, try again later");

        samadaToken.transfer(msg.sender, widthdrawalAmount);
        nextAccessTime[msg.sender] = block.timestamp + lockTime;
    }

    function getBalance() external view returns(uint){
        return samadaToken.balanceOf(address(this));
    }


    function setLockTime(uint _lockTime) external onlyOwner {
        lockTime = _lockTime;
    }

    function setTokenFaucetNumber(uint _widthdrawalAmount) external onlyOwner {
        widthdrawalAmount = _widthdrawalAmount * (10**18);
    }

    function withdrawl() external onlyOwner {
        uint contractBalance = address(this).balance;
        (bool success, ) = owner.call{value: address(this).balance}("");
        
        require(success, "Error happened on sending ether to the owner");
        emit Withdrawl(msg.sender, contractBalance);
    }   

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function destory() external onlyOwner {
        selfdestruct(owner);
    }
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
}