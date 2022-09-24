import { Suspense, useState } from "react";
import { ControlsContainer } from "./components/controls-container";
import { SelectableButton } from "./components/selectable-button";
import { tabComponentMap, Tabs, tabsList } from "./helpers/tabs";

export const PresentationsGraphAstar = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Maze);
  const Component = tabComponentMap[currentTab];

  return (
    <div style={{ width: "800px" }}>
      <ControlsContainer $bottomPadding>
        {tabsList.map(({ name, tab }) => (
          <SelectableButton
            onClick={() => setCurrentTab(tab)}
            $selected={currentTab === tab}
            key={tab}
          >
            {name}
          </SelectableButton>
        ))}
      </ControlsContainer>
      <Suspense fallback={<div>Ładowanie prezentacji...</div>}>
        <Component />
      </Suspense>
    </div>
  );
};
