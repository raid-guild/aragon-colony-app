import React, { useState, useEffect } from "react";
import { useAragonApi } from "@aragon/api-react";
import { Button, Header, Main, SyncIndicator, SidePanel } from "@aragon/ui";
import ColonyInfoBox from "./components/ColonyInfoBox";
import FundingPotsTable from "./components/FundingPotsTable";
import MoveFundsForm from "./components/MoveFundsForm";
import { getFundingPots } from "./getFundingPots";

function App() {
  const { api, appState, currentApp } = useAragonApi();
  const { isSyncing } = appState;
  const [sidePanelOpened, setSidePanelOpened] = useState(false);
  const [pots, setPots] = useState([]);

  function onMoveFunds({ fromPot, toPot, amount, token }) {
    console.log({ fromPot, toPot, amount, token });
    setSidePanelOpened(false);

    // Call smart contract action
    api.moveFundsBetweenPots(fromPot, toPot, amount, token).toPromise();
  }

  const appAddress = (currentApp || {}).appAddress;

  useEffect(() => {
    getFundingPots({
      appAddress,
      networkUrl: "http://localhost:8545",
    })
      .then(setPots)
      .catch(console.error);
  }, [appAddress]);

  const errors = [];

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Colony"
        secondary={
          <Button
            mode="strong"
            label="Move funds"
            onClick={() => setSidePanelOpened(true)}
          />
        }
      />

      <ColonyInfoBox />
      <FundingPotsTable
        pots={pots.map((pot) => ({
          name: `${pot.id}`,
          account: "0x0000000000000000000000000000000000000000",
          associatedType: pot.associatedType,
          amount: `${pot.balance} TKN1`,
        }))}
      />

      <SidePanel
        title="Move funds"
        opened={sidePanelOpened}
        onClose={() => setSidePanelOpened(false)}
      >
        <MoveFundsForm pots={pots} onMoveFunds={onMoveFunds} />
      </SidePanel>
    </Main>
  );
}

export default App;
