pragma solidity ^0.4.24;

import "./LDHTokenB3.sol";
import 'zeppelin-solidity/contracts/math/SafeMath.sol';



contract LDHTokenB3Sale {
	address private admin;
	LDHTokenB3 public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokenSold;

	event Sell(
		address _buyer,
		uint256 _amount
	);	

	function LDHTokenB3Sale (LDHTokenB3 _tokenContract, uint256 _tokenPrice) {
		//add admin
		admin = msg.sender;
		//interaction token contact 
		tokenContract = _tokenContract;
		//Token price
		tokenPrice = _tokenPrice;
	}	

	function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

	function buyTokens(uint256 _numberOfTokens) public payable {
		//require same amount of the token price
		//prevert under-paying
		require (msg.value == mul(_numberOfTokens, tokenPrice));
		//prevert oversell tokens / enough token to sell
		require (tokenContract.balanceOf(this) >= _numberOfTokens);
		//require transfer is successful
		require (tokenContract.transfer(msg.sender, _numberOfTokens));		

		//keep track token sold..
		tokenSold += _numberOfTokens;
		//Trigger sell event
		Sell(msg.sender, _numberOfTokens);

		
	}
	
}
