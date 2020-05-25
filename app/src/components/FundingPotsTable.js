import React from "react";
import PropTypes from "prop-types";
import { IdentityBadge, DataView } from "@aragon/ui";

function FundingPotsTable({ pots }) {
  return (
    <DataView
      fields={["Name", "Account", "Amount"]}
      entries={pots.map((pot) => ({
        name: pot.name,
        account: pot.account,
        amount: pot.amount,
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

FundingPotsTable.propTypes = {
  pots: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      account: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ),
};

export default FundingPotsTable;
