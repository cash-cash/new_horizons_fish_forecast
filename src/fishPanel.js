import React from "react";
import Paper from "@material-ui/core/Paper";

export const FishPanel = props => {
  const { fish } = props;
  return (
    <Paper className={"fishPanel"}>
      <h3>{fish.name_eng}</h3>
      <p className={"timeText"}>
        {fish.time.is_all_day
          ? "All Day"
          : `${fish.time.times[0].time_start}:00 - ${fish.time.times[0].time_end}:00`}
      </p>
      {fish.rainingOnly && (
        <div>
          🌧️<em>If Raining </em> 🌧️
        </div>
      )}
      <div>{fish.price.toLocaleString()} Bells </div>
      <div className={"fishimg"}>
        <img src={`/fish/${fish.img}`}></img>
      </div>
    </Paper>
  );
};
