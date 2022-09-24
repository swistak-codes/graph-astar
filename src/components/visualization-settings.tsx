import { Dispatch, SetStateAction } from "react";
import { ControlsContainer } from "./controls-container";

type Props = {
  colorDistance: boolean;
  setColorDistance: Dispatch<SetStateAction<boolean>>;
};

export const VisualizationSettings = ({
  colorDistance,
  setColorDistance,
}: Props) => (
  <ControlsContainer>
    <div>
      <input
        type={"checkbox"}
        id="color"
        checked={colorDistance}
        onChange={(e) => setColorDistance(e.target.checked)}
      />
      <label htmlFor="color">&nbsp;Wizualizuj obliczone odległości</label>
    </div>
  </ControlsContainer>
);
