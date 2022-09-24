import styled, { css } from "styled-components";

export const ControlsContainer = styled.div<{ $bottomPadding?: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-top: 10px;
  ${(props) =>
    props.$bottomPadding &&
    css`
      padding-bottom: 10px;
    `}
`;
