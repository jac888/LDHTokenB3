var LDHTokenB3Sale = artifacts.require("./LDHTokenB3Sale.sol"); //token sale contract

contract('LDHTokenB3Sale', () => {
	var TkSaleInstance;
	var tokenPirce = 1000000000000000; //in wei
	it('init contract with the correct values', () => {
		return LDHTokenB3Sale.deployed().then(instance => {
			TkSaleInstance = instance;
			return TkSaleInstance.address;
		}).then(address => {
			console.log(address);
			//check contract address is exist with test
			assert.notEqual(address,0X0,'has contract address');
			return TkSaleInstance.tokenContract();
		}).then(address => {
			console.log(address);
			//check token contract address is exist with test
			assert.notEqual(address,0X0,'has token contract address');
			return TkSaleInstance.tokenPrice();
		}).then(price => {
			console.log(price.toNumber());
			//check token token prices with test
			assert.equal(price,tokenPirce,'has token price');
		});
	})
})