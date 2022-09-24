import styled, { css } from "styled-components";
import { GridCellProps } from "../types";
import { calculateHighlightValue } from "../../helpers/calculate-highlight-value";
import {
  highlightColor,
  PATH_COLOR,
  SELECTION_COLOR,
  TRAP_COLOR,
} from "../../helpers/theme";

export const GridCell = styled.div<GridCellProps>`
  outline: 1px solid black;
  background: white;

  ${(props) =>
    props.$cell.isBlocked
      ? css`
          background: ${TRAP_COLOR};
        `
      : css`
          ${props.$additionalInfo &&
          css`
            background: ${highlightColor(
              calculateHighlightValue(props.$additionalInfo)
            )};
          `}
          ${props.$pathPart &&
          css`
            background: ${PATH_COLOR};
          `}
          ${props.$selected &&
          css`
            background: ${SELECTION_COLOR};
          `}
          &:hover {
            cursor: pointer;
            background: ${SELECTION_COLOR};
          }
        `}
`;
