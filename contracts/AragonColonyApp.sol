pragma solidity >=0.5.8;

import "../node_modules/@aragon/os/contracts/apps/AragonApp.sol";
import "../node_modules/@aragon/apps-agent/contracts/Agent.sol";
import "./colony/IColonyNetwork.sol";
import "./colony/IColony.sol";

contract AragonColonyApp is AragonApp {
    Agent public agent;
    ColonyNetwork public network;
    ColonyClient public client;

    function initialize(Agent _agent, IColonyNetwork _network, address _colony) public onlyInit {
        require(isContract(address(_agent)), ERROR_AGENT_NOT_CONTRACT);
        require(isContract(address(_network)), ERROR_NETWORK_NOT_CONTRACT);

        agent = _agent;
        network = _network;
        client = network.getColonyClientByAddress(_colony);

        require(isContract(address(client)), ERROR_CLIENT_NOT_CONTRACT);

        initialized();
    }

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
        bytes memory encodedFunctionCall = abi.encodeWithSignature(
            "moveFundsBetweenPots(uint256 _permissionDomainId, uint256 _fromChildSkillIndex, uint256 _toChildSkillIndex, uint256 _fromPot, uint256 _toPot, uint256 _amount, address _token)",
            _permissionDomainId,
            _fromChildSkillIndex,
            _toChildSkillIndex,
            _fromPot,
            _toPot,
            _amount,
            _token
        );

        _safeExecuteNoError(client, encodedFunctionCall, ERROR_MOVE_FUNDS_FAILED);
    }
}
