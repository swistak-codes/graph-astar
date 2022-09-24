import styled from "styled-components";

export const DisplayContainer = styled.div<{ $size: number }>`
  width: 80%;
  aspect-ratio: 1;
  margin: 0 auto;
  background: white;
  border: 1px solid black;
  display: grid;
  grid-template-rows: repeat(${(props) => props.$size}, 1fr);
  grid-template-columns: repeat(${(props) => props.$size}, 1fr);
  padding: 6px;
`;
