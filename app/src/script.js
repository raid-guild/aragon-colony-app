import "core-js/stable";
import "regenerator-runtime/runtime";
import Aragon, { events } from "@aragon/api";

const app = new Aragon();

app.store(
  async (state, { event }) => {
    const nextState = {
      ...state,
    };

    try {
      switch (event) {
        case "Increment":
          return { ...nextState, count: await getValue() };
        case "Decrement":
          return { ...nextState, count: await getValue() };
        case events.SYNC_STATUS_SYNCING:
          return { ...nextState, isSyncing: true };
        case events.SYNC_STATUS_SYNCED:
          return { ...nextState, isSyncing: false };
        default:
          return state;
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    init: initializeState(),
  }
);

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState() {
  return async (cachedState) => {
    const fundingPots = await getFundingPots();

    // Do not return cache state for now
    // return {
    //   ...cachedState,
    //   fundingPots
    // }

    return { fundingPots };
  };
}

async function getFundingPots() {
  // Fetch the App's Colony contract address
  const colonyAddress = await app.call("client").toPromise();

  // Instantiate Colony client contract to query view functions
  const colony = app.external(colonyAddress, mockColonyAbi);

  const potCount = await colony.getFundingPotCount().toPromise();
  const tokenAddress = await colony.tokenAddress().toPromise();

  // Aggregate IDs into an array to use Promise.all
  const potIds = [];
  for (let i = 0; i < potCount.toNumber(); i++) potIds.push(i);

  const pots = await Promise.all(
    potIds.map(async (id) => {
      const [balance, payout, pot] = await Promise.all([
        colony.getFundingPotBalance(id, tokenAddress).toPromise(),
        colony.getFundingPotPayout(id, tokenAddress).toPromise(),
        colony.getFundingPot(id).toPromise(),
      ]);
      const associatedType =
        fundingPotAssociatedType[pot.associatedType.toNumber()];
      const associatedTypeId = pot.associatedTypeId.toNumber();
      const payoutsWeCannotMake = pot.payoutsWeCannotMake;
      console.log(`Fetched ${id}`);
      return {
        id,
        balance: balance,
        payout: payout,
        associatedType,
        associatedTypeId,
        payoutsWeCannotMake: payoutsWeCannotMake,
      };
    })
  );

  return {
    version: 2,
    colonyClient,
    pots,
  };
}

async function getValue() {
  return parseInt(await app.call("value").toPromise(), 10);
}
