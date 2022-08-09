// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Lottery {

    address public owner;
    address payable[] players;
    address payable winner;
    address payable public  charity;
    address payable dev;
  
    uint256 public ticketAmount = 0;
    uint256 public ticketPrice = 0.01 ether;
    uint256  prizePool = 0;
    uint256  donation = 0;
    uint256  comission = 0;
    uint public index = 0;

    uint public LotteryNo;

    mapping (uint => address payable) LotteryHistory;

    bool public Paused = false;

    constructor() {
        owner = msg.sender;
        LotteryNo = 1;
    }

    function GetWinnersByLottery (uint _LotteryNo) public view returns (address payable) {
        return LotteryHistory[_LotteryNo];
    }
    
    function GetPrizepool() public view returns (uint) {
       return prizePool;
    }

    function GetDonation() public view returns (uint) {
       return donation;
    }

        function GetDonationWallet() public view returns (address) {
       return charity;
    }

     function GetWinnerWallet() public view returns (address) {
       return winner;
    }


    function GetTotalBalance() public view returns (uint) {
        return address(this).balance;
    }

    function ListPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function BuyTicket(uint256 quantity) public payable {
        require(!Paused, "Tickets are not out yet");
        require(quantity > 0, "Ticket quantity must be minimum 1");
        require(msg.value == ticketPrice * quantity, "the amount of ether sent is not correct");


        players.push(payable(msg.sender));
        ticketAmount = address(this).balance / ticketPrice;


        comission = ((ticketAmount * ticketPrice) * 10/100);
        donation = ((ticketAmount * ticketPrice) * 45/100);
        prizePool = ((ticketAmount * ticketPrice) * 45/100);


    }

    function GetRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

       function pickWinner() public onlyOwner {
        index = GetRandomNumber() % players.length;
        winner = players[index];
        LotteryHistory[LotteryNo] = players[index];
        LotteryNo++;

        players = new address payable[](0);
        ticketAmount = 0;
    } 

        //LotteryHistory[LotteryNo] = players[index];
       // LotteryNo++;
    

     function SetOwnerAddress(address payable _Owner) public onlyOwner {
        owner = _Owner;
    }
     function SetDevAddress(address payable _dev) public onlyOwner {
        dev = _dev;
    }

         function SetCharityAddress(address payable _Charity) public onlyOwner {
        charity = _Charity;
    }

    function ReleaseFunds() public onlyOwner{

        winner.transfer(prizePool);
        charity.transfer(donation);
        dev.transfer(comission);
         players = new address payable[](0);


    prizePool = 0;
    donation = 0;
    comission = 0;
    index = 0;
    }

    function SetTicketPrice(uint256 _ticketPrice) public onlyOwner{
        ticketPrice = _ticketPrice;
    } 

    function SetPaused(bool _state) public onlyOwner {
        Paused = _state;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
   
}