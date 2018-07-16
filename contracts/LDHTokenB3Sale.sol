pragma solidity ^0.4.24;
import "./LDHTokenB3.sol";

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
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}	

	function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x);
    }

    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }

	function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

	function buyTokens(uint256 _numberOfTokens) public payable {
		require (msg.value == mul(_numberOfTokens, tokenPrice));
		require (tokenContract.balanceOf(this) >= _numberOfTokens);
		require (tokenContract.transfer(msg.sender, _numberOfTokens));		
		tokenSold = add(tokenSold, _numberOfTokens);
		Sell(msg.sender, _numberOfTokens);
	}
 
	function endSales() public {
		require(msg.sender == admin);
		require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
		selfdestruct(admin);
	}
}
