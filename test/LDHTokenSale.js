var LDHTokenB3Sale = artifacts.require("./LDHTokenB3Sale.sol"); //token sale contract
var LDHTokenB3 = artifacts.require("./LDHTokenB3.sol"); //import token contract to test

contract('LDHTokenB3Sale', (accounts) => {
	var TkInstance;
	var TkSaleInstance;
	var admin = accounts[0];
	var buyer = accounts[1];
	var numberOfTokens;
	var tokenPirce = 1000000000000000; //in wei
	var tokenAvaliableToSell = 510000;

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
	//test for token sales
	it('facilitates token buying' , () => {
		return LDHTokenB3.deployed().then(instance => {
			//grab token instance first
			TkInstance = instance;
			return LDHTokenB3Sale.deployed();
		}).then(instance => {
			//then grab token sales contract
			TkSaleInstance = instance;
			//give token to token contract
			return TkInstance.transfer(TkSaleInstance.address, tokenAvaliableToSell, {from: admin});
		}).then(receipt => {
			//test on 10 token sales
			console.log("event : " + receipt.logs[0].event);
			numberOfTokens = 30;		
			console.log("total price : " + numberOfTokens * tokenPirce +"(In wei)");
			return TkSaleInstance.buyTokens(numberOfTokens,{from: buyer, value: numberOfTokens * tokenPirce});
		}).then(receipt => {
			assert.equal(receipt.logs.length, 1, 'event triggered!');
			assert.equal(receipt.logs[0].event, 'Sell','should be the "Sell" event matched!');
			// console.log("buyer address in var : " + buyer);
			// console.log("buyer address in function : " + receipt.logs[0].args._buyer);
			assert.equal(receipt.logs[0].args._buyer,buyer,'Logged the account that purchased token');
			assert.equal(receipt.logs[0].args._amount,numberOfTokens ,'Logged the number of token purchased');
			return TkSaleInstance.tokenSold();
		}).then(amount => {
			console.log("total " + amount.toNumber() + ' token sold!');
			assert.equal(amount.toNumber(),numberOfTokens,'increment of token sold');
			return TkInstance.balanceOf(TkSaleInstance.address);
		}).then(balance => {
			console.log("contract token balance now is : " + balance.toNumber());
			assert.equal(balance.toNumber(),tokenAvaliableToSell - numberOfTokens,'this is correct balace of token sale contract address ');
			return TkInstance.balanceOf(buyer);
		}).then(balance => {
			console.log("buyer token balance now is : " + balance.toNumber());
			// try to buy tokens different from the ether value
			// under paying
			return TkSaleInstance.buyTokens(numberOfTokens,{from: buyer, value: 1 });
		}).then(assert.fail).catch(error => {
			console.log(error.message);
			assert(error.message.indexOf("revert") >= 0 , 'msg.value must have equal tokens in wei');
			return TkSaleInstance.buyTokens(90000,{from: buyer, value: numberOfTokens * tokenPirce});
		}).then(assert.fail).catch(error => {
			console.log(error.message);
			assert(error.message.indexOf("revert") >= 0 , 'should not buy tokens exceed than account avaliable tokens');
		})
	})
})