var Lottery = artifacts.require("./Lottery.sol");

contract("Lottery", function(accounts) {
  var lotteryInstance;

  it("Lottery Contract deployement", function() {
    return Lottery.deployed().then(function(instance) {
     
      assert(instance,"contract deployed successfully");
    });
  });


  

  it("Multiple players sending the money gets added in the players list", function() {
    return Lottery.deployed().then(function(instance) {
      lotteryInstance = instance;
      return lotteryInstance.enter({ value: web3.utils.toWei(String(1), 'ether'),from:accounts[0]});
    }).then(function(receipt){
      return lotteryInstance.enter({ value: web3.utils.toWei(String(1), 'ether'),from:accounts[1]});
    }).then(function(receipt1){
      return lotteryInstance.enter({ value: web3.utils.toWei(String(1), 'ether'),from:accounts[2]});
    }).then(function(receipt2){

      return lotteryInstance.getAllEntries();
    }).then(function(persons){
   assert.equal(3,persons.length,"contains the exact length");
     assert.equal(persons[0],accounts[0], "contains the correct value");
     assert.equal(persons[1],accounts[1], "contains the correct value");
     assert.equal(persons[2],accounts[2], "contains the correct value");
 
  });
    });


it("Minimum amount of ether requires", function() {
    return Lottery.deployed().then(function(instance) {
      lotteryInstance = instance;
      try{
        lotteryInstance.enter({ value: web3.utils.toWei(String(0), 'ether'),from:accounts[2]});
        
      }
      catch(err){
        assert(err);
      }
   
  });
    });

it("PickWinner called by only lottery manager", function() {
    return Lottery.deployed().then(function(instance) {
      lotteryInstance = instance;
      try{
        lotteryInstance.pickWinner({ from:accounts[1]});
        
      }
      catch(err){
        assert(err);
      }
   
  });
    });
});

/*it("Sends money to the winner and reset the persons array", function() {

    return Lottery.deployed().then(function(instance) {
      lotteryInstance = instance;
      return lotteryInstance.enter({ value: web3.utils.toWei(String(2), 'ether'),from:accounts[1]});
    }).then(function(receipt10){

       var iBalance = web3.eth.getBalance(accounts[1]);
        console.log(iBalance);
    }).then(function(receipt11){

    var finalBalance = web3.eth.getBalance(accounts[1]);
     var diff= finalBalance-iBalance;
     assert(diff > web3.utils.toWei(String(1.8), 'ether'));
 
  //});
//});
});
});
});


  */
    

  

