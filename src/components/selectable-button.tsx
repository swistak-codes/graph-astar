import styled, { css } from "styled-components";

export const SelectableButton = styled.button<{ $selected: boolean }>`
  ${(props) =>
    props.$selected &&
    css`
      background: yellow;
    `}
`;
