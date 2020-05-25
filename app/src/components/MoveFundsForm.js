import React, { useState } from "react";
import PropTypes from "prop-types";
import { GU, Button, DropDown, TextInput, Field } from "@aragon/ui";
import styled from "styled-components";

const tokens = ["TKN1", "TKN2", "TKN3"];
const maxAmount = 100000;

function MoveFundsForm({ pots, onMoveFunds }) {
  const [fromPotIdx, setFromPotIdx] = useState(0);
  const [toPotIdx, setToPotIdx] = useState(0);
  const [amount, setAmount] = useState(0);
  const [tokenIdx, setTokenIdx] = useState(0);

  function onSubmit() {
    onMoveFunds({
      fromPot: pots[fromPotIdx],
      toPot: pots[toPotIdx],
      amount,
      token: tokens[tokenIdx],
    });
  }

  const errors = [];

  return (
    <div
      css={`
        margin-top: ${3 * GU}px;
      `}
    >
      <Field label="From pot">
        <DropDown
          header="Outcome"
          placeholder="Outcome"
          selected={fromPotIdx}
          onChange={setFromPotIdx}
          items={pots}
          wide
        />
      </Field>
      <Field label="To pot">
        <DropDown
          header="Outcome"
          placeholder="Outcome"
          selected={toPotIdx}
          onChange={setToPotIdx}
          items={pots}
          wide
        />
      </Field>
      <Field label="Amount">
        <InputGroup>
          <TextInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            max={maxAmount}
            step={1}
            required
            wide
          />
          <DropDown
            header="Outcome"
            placeholder="Outcome"
            selected={tokenIdx}
            onChange={setTokenIdx}
            items={tokens}
          />
        </InputGroup>
      </Field>

      <Button
        onClick={onSubmit}
        disabled={errors.length > 0}
        mode="strong"
        wide
      >
        Move funds
      </Button>
    </div>
  );
}

const InputGroup = styled.div`
  display: flex;
`;

MoveFundsForm.propTypes = {
  pots: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMoveFunds: PropTypes.func.isRequired,
};

export default MoveFundsForm;
