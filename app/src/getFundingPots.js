import { ethers } from "ethers";

const colonyGetterAbi = [
  "function client() public view returns (address client)",
];

const colonyAbi = [
  "function tokenAddress() public view returns (address tokenAddress)",
  "function getFundingPotCount() public view returns (uint256 count)",
  "function getFundingPotBalance(uint256 _potId, address _token) public view returns (uint256)",
  "function getFundingPotPayout(uint256 _potId, address _token) public view returns (uint256)",
  "function getFundingPot(uint256 _potId) public view returns(uint256 associatedType, uint256 associatedTypeId, uint256 payoutsWeCannotMake)",
];

// enum FundingPotAssociatedType { Unassigned, Domain, Task, Payment, Expenditure }
const fundingPotAssociatedType = [
  "Unassigned",
  "Domain",
  "Task",
  "Payment",
  "Expenditure",
];

export async function getFundingPots({ appAddress, networkUrl }) {
  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  const app = new ethers.Contract(appAddress, colonyGetterAbi, provider);
  const colonyAddress = await app.client();

  const colony = new ethers.Contract(colonyAddress, colonyAbi, provider);

  const tokenAddress = await colony.tokenAddress();
  console.log({ tokenAddress });
  const potCount = await colony.getFundingPotCount();
  const potIds = [];
  for (let i = 0; i < potCount.toNumber(); i++) potIds.push(i);

  return await Promise.all(
    potIds.map(async (id) => {
      const [balance, payout, pot] = await Promise.all([
        colony.getFundingPotBalance(id, tokenAddress),
        colony.getFundingPotPayout(id, tokenAddress),
        colony.getFundingPot(id),
      ]);
      const associatedType =
        fundingPotAssociatedType[pot.associatedType.toNumber()];
      const associatedTypeId = pot.associatedTypeId.toNumber();
      const payoutsWeCannotMake = pot.payoutsWeCannotMake;
      console.log(`Fetched ${id}`);
      return {
        id,
        balance: formatEther(balance),
        payout: formatEther(payout),
        associatedType,
        associatedTypeId,
        payoutsWeCannotMake: formatEther(payoutsWeCannotMake),
      };
    })
  );
}

function formatEther(gwei) {
  return +parseFloat(ethers.utils.formatEther(gwei)).toFixed(4);
}
