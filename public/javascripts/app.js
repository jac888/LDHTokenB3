App = {
  web3Provider: null,
  contracts: {},
  init: () => {
    console.log("app initialized...");
    return App.initWeb3();
  },
  initWeb3: () => {
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },
  initContracts: () => {
    $.getJSON("/contracts/LDHTokenB3Sale.json", LDHTokenB3Sale => {
      App.contracts.LDHTokenB3Sale = TruffleContract(LDHTokenB3Sale);
      App.contracts.LDHTokenB3Sale.setProvider(App.web3Provider);
      App.contracts.LDHTokenB3Sale.deployed().then(function(LDHTokenB3Sale) {
        console.log(
          "LDHToken Sale Contract Address : " + LDHTokenB3Sale.address
        );
      });
    }).done(() => {
      $.getJSON("/contracts/LDHTokenB3.json", LDHTokenB3 => {
        App.contracts.LDHTokenB3 = TruffleContract(LDHTokenB3);
        App.contracts.LDHTokenB3.setProvider(App.web3Provider);
        App.contracts.LDHTokenB3.deployed().then(function(LDHTokenB3) {
          console.log("LDHToken Contract Address : " + LDHTokenB3.address);
        });
      });
    });
  }
};

$(window).on("load", () => {
  App.init();
});
