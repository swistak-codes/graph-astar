import styled, { css } from "styled-components";
import { MazeCellProps } from "../types";
import { calculateHighlightValue } from "../../helpers/calculate-highlight-value";
import {
  highlightColor,
  PATH_COLOR,
  SELECTION_COLOR,
  TRAP_COLOR,
} from "../../helpers/theme";

const MAZE_BORDER = `1px solid ${TRAP_COLOR}`;

export const MazeCell = styled.div<MazeCellProps>`
  ${(props) =>
    props.$cell.top &&
    css`
      border-top: ${MAZE_BORDER};
    `}
  ${(props) =>
    props.$cell.bottom &&
    css`
      border-bottom: ${MAZE_BORDER};
    `}
  ${(props) =>
    props.$cell.left &&
    css`
      border-left: ${MAZE_BORDER};
    `}
  ${(props) =>
    props.$cell.right &&
    css`
      border-right: ${MAZE_BORDER};
    `}

  ${(props) =>
    props.$additionalInfo &&
    css`
      background: ${highlightColor(
        calculateHighlightValue(props.$additionalInfo)
      )};
    `}

  ${(props) =>
    props.$pathPart &&
    css`
      background: ${PATH_COLOR};
    `}

  ${(props) =>
    props.$selected &&
    css`
      background: ${SELECTION_COLOR};
    `}

  &:hover {
    cursor: pointer;
    background: ${SELECTION_COLOR};
  }
`;
