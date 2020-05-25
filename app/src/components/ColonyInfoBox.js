import React from "react";
import { useNetwork } from "@aragon/api-react";
import { Box, GU, TokenBadge, useTheme } from "@aragon/ui";

const colonyName = "Colony1";
const tokenAddress = "0x0000000000000000000000000000000000000000";
const tokenName = "Token 1";
const tokenSymbol = "TKN1";

export default function ColonyInfoBox() {
  const theme = useTheme();
  const network = useNetwork();

  return (
    <React.Fragment>
      <Box heading="Colony info">
        <ul>
          {[
            ["Colony name", <strong>{colonyName}</strong>],
            ["Total supply", <strong>{100000}</strong>],

            [
              "Token",
              <TokenBadge
                address={tokenAddress}
                name={tokenName}
                symbol={tokenSymbol}
                networkType={network && network.type}
              />,
            ],
          ].map(([label, content], index) => (
            <li
              key={index}
              css={`
                display: flex;
                justify-content: space-between;
                list-style: none;
                color: ${theme.surfaceContent};

                & + & {
                  margin-top: ${2 * GU}px;
                }

                > span:nth-child(1) {
                  color: ${theme.surfaceContentSecondary};
                }
                > span:nth-child(2) {
                  // “:” is here for accessibility reasons, we can hide it
                  opacity: 0;
                  width: 10px;
                }
                > span:nth-child(3) {
                  flex-shrink: 1;
                }
                > strong {
                  text-transform: uppercase;
                }
              `}
            >
              <span>{label}</span>
              <span>:</span>
              {content}
            </li>
          ))}
        </ul>
      </Box>
    </React.Fragment>
  );
}
