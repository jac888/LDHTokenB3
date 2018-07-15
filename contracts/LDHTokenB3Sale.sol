pragma solidity ^0.4.24;

import "./LDHTokenB3.sol";


contract LDHTokenB3Sale {
		address admin;
		LDHTokenB3 public tokenContract;
		uint256 public tokenPrice;
	function LDHTokenB3Sale (LDHTokenB3 _tokenContract, uint256 _tokenPrice) {
		//add admin
		admin = msg.sender;
		//interaction token contact 
		tokenContract = _tokenContract;
		//Token price
		tokenPrice = _tokenPrice;
	}	
}
