var LDHTokenB3 = artifacts.require("./LDHTokenB3.sol"); //migration files goes to this directory
var LDHTokenB3Sale = artifacts.require("./LDHTokenB3Sale.sol"); //token sale contract

module.exports = function(deployer) {
  deployer.deploy(LDHTokenB3, 1000000).then( () => {
  	var tokenPrice = 1000000000000000 //in 0.001 ethereum
  	return deployer.deploy(LDHTokenB3Sale, LDHTokenB3.address, tokenPrice);
  });
};