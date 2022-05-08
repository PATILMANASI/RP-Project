// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;
contract Lottery{

address public manager;   //address of manager

address[] public persons;  //array of players playing lottery

constructor() public {

    manager=msg.sender;
}

function enter() public payable{

    require(msg.value > .01 ether);
    persons.push(msg.sender);
}

function random() public view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,persons)));  //to generate random number
}

function pickwinner() public restricted{
 uint x=random() % persons.length;
 payable(persons[x]).transfer(address(this).balance);
 persons = new address[](0);   // O is used to start an array with zero number of elements

}

modifier restricted(){          

    require(msg.sender==manager);
    _;
}                              //only manager performs the operation

function getAllEntries() public view returns (address[] memory){

    return persons;
}

}