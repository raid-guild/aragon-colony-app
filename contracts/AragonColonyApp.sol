pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-agent/contracts/Agent.sol";
import "./colony/IColonyNetwork.sol";
import "./colony/IColony.sol";

contract AragonColonyApp is AragonApp {
    bytes32 constant public MOVE_FUNDS_ROLE = keccak256("MOVE_FUNDS_ROLE");

    string private constant ERROR_AGENT_NOT_CONTRACT = "COLONY_AGENT_NOT_CONTRACT";
    string private constant ERROR_NETWORK_NOT_CONTRACT = "COLONY_NETWORK_NOT_CONTRACT";
    string private constant ERROR_CLIENT_NOT_CONTRACT = "COLONY_CLIENT_NOT_CONTRACT";
    string private constant ERROR_MOVE_FUNDS_FAILED = "COLONY_MOVE_FUNDS_FAILED";

    Agent public agent;
    IColonyNetwork public network;
    IColony public client;

    event AppInitialized();
    event FundsMoved(
        uint256 _fromPot,
        uint256 _toPot,
        uint256 _amount,
        address _token
    );

    function initialize(Agent _agent, IColonyNetwork _network, address _colony) public onlyInit {
        require(isContract(address(_agent)), ERROR_AGENT_NOT_CONTRACT);
        require(isContract(address(_network)), ERROR_NETWORK_NOT_CONTRACT);

        agent = _agent;
        network = _network;
        client = network.getColonyClientByAddress(_colony);

        require(isContract(address(client)), ERROR_CLIENT_NOT_CONTRACT);

        initialized();
        emit AppInitialized();
    }

    function _safeExecuteNoError() internal {}

    /**
     * @notice Move funds between the colony's domains.
     * @param _fromPot Pot ID to be transferred from
     * @param _toPot Pot ID to be transferred to
     * @param _amount Amount to transfer in wei
     * @param _token Address of token to transfer
     */
    function moveFundsBetweenPots(
        uint256 _fromPot,
        uint256 _toPot,
        uint256 _amount,
        address _token
    ) external auth(MOVE_FUNDS_ROLE) {
        uint256 permissionDomainId = 1;
        uint256 permissionDomainSkillId = client.getDomain(permissionDomainId).skillId;

        uint256 fromDomainId = client.getDomainFromFundingPot(_fromPot);
        uint256 toDomainId = client.getDomainFromFundingPot(_toPot);

        uint256 fromDomainSkillId = client.getDomain(fromDomainId).skillId;
        uint256 toDomainSkillId = client.getDomain(toDomainId).skillId;

        uint256[] childSkills = network.getSkill(permissionDomainSkillId).children;
        uint256 fromChildSkillIndex;
        uint256 toChildSkillIndex;

        for (uint256 index = 0; index < childSkills.length; index++) {
            if (fromDomainSkillId == childSkills[index]) {
                fromChildSkillIndex = index;
            }
            else if (toDomainSkillId == childSkills[index]) {
                toChildSkillIndex = index;
            }
        }

        bytes memory encodedFunctionCall = abi.encodeWithSignature(
            "moveFundsBetweenPots(uint256 _permissionDomainId, uint256 _fromChildSkillIndex, uint256 _toChildSkillIndex, uint256 _fromPot, uint256 _toPot, uint256 _amount, address _token)",
            permissionDomainId,
            fromChildSkillIndex,
            toChildSkillIndex,
            _fromPot,
            _toPot,
            _amount,
            _token
        );

        _safeExecuteNoError(client, encodedFunctionCall, ERROR_MOVE_FUNDS_FAILED);
        emit FundsMoved(_fromPot, _toPot, _amount, _token);
    }
}
