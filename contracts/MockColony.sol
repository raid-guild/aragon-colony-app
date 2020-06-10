pragma solidity ^0.4.24;


// #################
// Mock colony state
// #################

contract MockColony {
    // We do have 1 "special" funding pot with id 0 for rewards which will carry the "Unassigned" type.
    // as they are unrelated to other entities in the Colony the same way the remaining funding pots are releated to domains, tasks and payouts.
    enum FundingPotAssociatedType {
        Unassigned,
        Domain,
        Task,
        Payment,
        Expenditure
    }

    struct FundingPot {
        // Funding pots can store multiple token balances, for ETH use 0x0 address
        mapping(address => uint256) balance;
        // Funding pots can be associated with different fundable entities, for now these are: tasks, domains and payments.
        FundingPotAssociatedType associatedType;
        uint256 associatedTypeId;
        // Map any assigned payouts from this pot, note that in Tasks these are broken down to a more granular level on a per role basis
        mapping(address => uint256) payouts;
        uint256 payoutsWeCannotMake;
    }

    // FundingPots can be tied to tasks or domains, so giving them their own mapping.
    // FundingPot 1 can be thought of as the pot belonging to the colony itself that hasn't been assigned
    // to anything yet, but has had some siphoned off in to the reward pot.
    // FundingPot 0 is the 'reward' pot containing funds that can be paid to holders of colony tokens in the future.
    mapping(uint256 => FundingPot) fundingPots; // Storage slot 15
    uint256 public fundingPotCount = 0;
    address public tokenAddress = 0x869814034d96544f3C62DE2aC22448ed79Ac8e70;

    constructor() public {
        addMockFundingPots();
    }

    function addMockFundingPots() internal {
        fundingPots[0].balance[tokenAddress] = 0x19cbb92c110070edbe;
        fundingPots[0].associatedType = FundingPotAssociatedType.Unassigned;
        fundingPots[0].associatedTypeId = 0;

        fundingPots[1].balance[tokenAddress] = 0x8a3c5be1855e180000;
        fundingPots[1].associatedType = FundingPotAssociatedType.Domain;
        fundingPots[1].associatedTypeId = 1;

        fundingPots[2].balance[tokenAddress] = 0x5c1a5c8a4fecac0000;
        fundingPots[2].associatedType = FundingPotAssociatedType.Payment;
        fundingPots[2].associatedTypeId = 1;

        fundingPotCount = 3;
    }

    function getFundingPotCount() public view returns (uint256 count) {
        return fundingPotCount;
    }

    function getFundingPotBalance(uint256 _potId, address _token)
        public
        view
        returns (uint256)
    {
        return fundingPots[_potId].balance[_token];
    }

    function getFundingPotPayout(uint256 _potId, address _token)
        public
        view
        returns (uint256)
    {
        return fundingPots[_potId].payouts[_token];
    }

    function getFundingPot(uint256 _potId)
        public
        view
        returns (
            FundingPotAssociatedType associatedType,
            uint256 associatedTypeId,
            uint256 payoutsWeCannotMake
        )
    {
        FundingPot storage fundingPot = fundingPots[_potId];
        return (
            fundingPot.associatedType,
            fundingPot.associatedTypeId,
            fundingPot.payoutsWeCannotMake
        );
    }
}
