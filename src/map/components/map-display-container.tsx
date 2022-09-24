import styled from "styled-components";

export const MapDisplayContainer = styled.div`
  width: 80%;
  aspect-ratio: 1;
  margin: 0 auto;
  border: 1px solid black;

  > div {
    width: 100%;
    height: 100%;

    > *:not(.leaflet-container) {
      z-index: 500 !important;
    }
  }
`;
