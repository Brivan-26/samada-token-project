// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract SamadaToken is ERC20Capped, ERC20Burnable {

    // 1 Million token as max
    // cap = max tokens amount
    // possibility of burning tokens
    // reward the miner that includes our token's transaction on the blockchain

    address payable public owner;
    uint public blockReward;


    constructor(uint _cap, uint _reward) ERC20("SamadaToken", "SDA") ERC20Capped(formatNumber(_cap)){
        owner = payable(msg.sender);
        _mint(owner, formatNumber(700000));
        blockReward = formatNumber(_reward);
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: max supply reached!");
        super._mint(account, amount);
    }

    function _mintMinerReward() internal {
        // block.coinbase cointains the address of our dear miner!
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(address from, address to, uint value) internal virtual override {
        if (from != address(0) && to != block.coinbase && block.coinbase != address(0)) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }

    function setBlockReward(uint _reward) external onlyOwner {
        blockReward = _reward;
    }

    function destroy() external onlyOwner {
        selfdestruct(owner);
    }



    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }
    function formatNumber(uint _num) private view returns (uint) {
        return _num * (10 ** decimals());
    }

}
