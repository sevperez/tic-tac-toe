import React from "react";

import GamesHistory from "../containers/GamesHistory";
import RoundsHistory from "../containers/RoundsHistory";

const HistoryArea = (props) => {
  return (
    <div id="history">
      <RoundsHistory />
      <GamesHistory />
    </div>
  );
};

export default HistoryArea;
