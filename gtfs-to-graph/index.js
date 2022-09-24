import { advancedQuery, importGtfs, openDb } from "gtfs";
import _ from "lodash";
import { getDistance } from "./get-distance.js";
import { mapToObj } from "./map-to-obj.js";
import * as fs from "fs";

const config = {
  agencies: [
    {
      path: "./OtwartyWroclaw_rozklad_jazdy_GTFS.zip",
      exclude: ["shapes"],
    },
  ],
};

await importGtfs(config);
await openDb(config);

const stopTimes = await advancedQuery("stop_times", {
  join: [
    {
      type: "INNER",
      table: "trips",
      on: "stop_times.trip_id=trips.trip_id",
    },
    {
      type: "INNER",
      table: "stops",
      on: "stop_times.stop_id=stops.stop_id",
    },
  ],
});

const trips = _.groupBy(stopTimes, (x) => x.trip_id);

const resultNodes = new Map(); // <string, { }>
const resultNeighbors = new Map(); // <string, Set<string>>
const resultWeights = new Map(); // <string, int>

for (const [tripId, trip] of Object.entries(trips)) {
  console.log(tripId, trip[0].trip_headsign);
  const sequence = _.sortBy(trip, (x) => x.stop_sequence);
  for (let i = 1; i < sequence.length; i++) {
    const currentStop = sequence[i];
    const previousStop = sequence[i - 1];
    const weight = getDistance(
      currentStop.stop_lat,
      currentStop.stop_lon,
      previousStop.stop_lat,
      previousStop.stop_lon
    );

    // adding node
    if (!resultNodes.has(previousStop.stop_name)) {
      resultNodes.set(previousStop.stop_name, {
        id: previousStop.stop_name,
        lat: previousStop.stop_lat,
        lon: previousStop.stop_lon,
      });
    }
    if (!resultNodes.has(currentStop.stop_name)) {
      resultNodes.set(currentStop.stop_name, {
        id: currentStop.stop_name,
        lat: currentStop.stop_lat,
        lon: currentStop.stop_lon,
      });
    }

    // adding edge current -> previous
    const currEdgeKey = `${currentStop.stop_name},${previousStop.stop_name}`;
    if (resultNeighbors.has(currentStop.stop_name)) {
      const neighbors = resultNeighbors.get(currentStop.stop_name);
      neighbors.add(previousStop.stop_name);
      if (!resultWeights.has(currEdgeKey)) {
        resultWeights.set(currEdgeKey, weight);
      }
    } else {
      resultNeighbors.set(
        currentStop.stop_name,
        new Set([previousStop.stop_name])
      );
      if (!resultWeights.has(currEdgeKey)) {
        resultWeights.set(currEdgeKey, weight);
      }
    }

    // adding edge previous -> current
    const prevEdgeKey = `${previousStop.stop_name},${currentStop.stop_name}`;
    if (resultNeighbors.has(previousStop.stop_name)) {
      const neighbors = resultNeighbors.get(previousStop.stop_name);
      neighbors.add(currentStop.stop_name);
      if (!resultWeights.has(prevEdgeKey)) {
        resultWeights.set(prevEdgeKey, weight);
      }
    } else {
      resultNeighbors.set(
        previousStop.stop_name,
        new Set([currentStop.stop_name])
      );
      if (!resultWeights.has(prevEdgeKey)) {
        resultWeights.set(prevEdgeKey, weight);
      }
    }
  }
}

const result = {
  nodes: mapToObj(resultNodes),
  edges: mapToObj(resultNeighbors),
  weights: mapToObj(resultWeights),
};

const json = JSON.stringify(result);

fs.writeFileSync("./wroclaw.json", json, "utf8");
