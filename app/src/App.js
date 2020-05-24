import React, { useState } from "react";
import { useAragonApi } from "@aragon/api-react";
import { Button, Header, Main, SyncIndicator, SidePanel } from "@aragon/ui";
import ColonyInfoBox from "./components/ColonyInfoBox";
import PodsTable from "./components/PodsTable";
import MoveFundsForm from "./components/MoveFundsForm";

const pods = ["Pod 1", "Pod 2", "Pod 3", "Pod 4"];

function App() {
  const { api, appState } = useAragonApi();
  const { count, isSyncing } = appState;
  const [sidePanelOpened, setSidePanelOpened] = useState(false);

  function onMoveFunds({ fromPod, toPod, amount, token }) {
    console.log({ fromPod, toPod, amount, token });
    setSidePanelOpened(false);

    // Call smart contract action
    api.moveFundsBetweenPots(fromPod, toPod, amount, token).toPromise();

    // Counter App example
    // api.decrement(1).toPromise();
    // api.increment(1).toPromise();
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
      <PodsTable
        pods={pods.map((pod) => ({
          name: pod,
          account: "0x0000000000000000000000000000000000000000",
          amount: "7.900,33 TKN1",
        }))}
      />

      <SidePanel
        title="Move funds"
        opened={sidePanelOpened}
        onClose={() => setSidePanelOpened(false)}
      >
        <MoveFundsForm pods={pods} onMoveFunds={onMoveFunds} />
      </SidePanel>
    </Main>
  );
}

export default App;
