import React from "react";
import PropTypes from "prop-types";
import { IdentityBadge, DataView } from "@aragon/ui";

function PodsTable({ pods }) {
  return (
    <DataView
      fields={["Name", "Account", "Amount"]}
      entries={pods.map((pod) => ({
        name: pod.name,
        account: pod.account,
        amount: pod.amount,
      }))}
      renderEntry={({ name, account, amount }) => {
        return [
          <span>{name}</span>,
          <IdentityBadge entity={account} />,
          <span>{amount}</span>,
        ];
      }}
    />
  );
}

PodsTable.propTypes = {
  pods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      account: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ),
};

export default PodsTable;
