import { Graph } from "../algorithms/graph/graph";
import { useMemo } from "react";
import { ControlsContainer } from "./controls-container";
import { MapPoint, Point } from "../algorithms/types";

type Props<TNode, TPoint extends Point | MapPoint> = {
  graph: Graph<TNode, TPoint>;
};

export const GraphStats = <TNode, TPoint extends Point | MapPoint>({
  graph,
}: Props<TNode, TPoint>) => {
  const nodeCount = useMemo(() => graph.nodeCount, [graph]);
  const edgeCount = useMemo(() => graph.getAllEdges().length, [graph]);

  return (
    <ControlsContainer>
      <div>Liczba wierzchołków: {nodeCount},</div>
      <div>liczba krawędzi: {edgeCount}</div>
    </ControlsContainer>
  );
};
