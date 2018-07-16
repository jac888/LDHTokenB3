pragma solidity ^0.4.24;

contract LDHTokenB3 {
	string public name = "LDHTokenB3";
	string public symbol = "LDH3";
	string public standard = "ERC20 LDH Token V0.3";
	uint256 public totalSupply = 1000000;
	//uint public decimals = 18;

	mapping (address => uint256) public balanceOf; 
	mapping (address => mapping (address => uint256)) public allowance;

	event Transfer (
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint256 _value
	);
	
	
	constructor() public {
		balanceOf[msg.sender] = totalSupply;
	}	

	function transfer(address _to, uint256 _value) public returns(bool result) {
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	function approve (address _spender, uint256 _value) public returns(bool success) {
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	function transferFrom (address _from, address _to, uint256 _value) public returns(bool success) 
	{	
		require (_value <= balanceOf[_from]);
		require (_value <= allowance[_from][msg.sender]);
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;
		emit Transfer(_from, _to, _value);
		return true;
	}
}


