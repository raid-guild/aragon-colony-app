import React, { useState } from "react";
import { useAragonApi } from "@aragon/api-react";
import { Button, Header, Main, SyncIndicator, SidePanel } from "@aragon/ui";
import ColonyInfoBox from "./components/ColonyInfoBox";
import FundingPotsTable from "./components/FundingPotsTable";
import MoveFundsForm from "./components/MoveFundsForm";

const pots = ["Pot 1", "Pot 2", "Pot 3", "Pot 4"];

function App() {
  const { api, appState } = useAragonApi();
  const { isSyncing } = appState;
  const [sidePanelOpened, setSidePanelOpened] = useState(false);

  function onMoveFunds({ fromPot, toPot, amount, token }) {
    console.log({ fromPot, toPot, amount, token });
    setSidePanelOpened(false);

    // Call smart contract action
    api.moveFundsBetweenPots(fromPot, toPot, amount, token).toPromise();
  }

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
          name: pot,
          account: "0x0000000000000000000000000000000000000000",
          amount: "7.900,33 TKN1",
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
