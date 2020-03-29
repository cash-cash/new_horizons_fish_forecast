import React, { useState } from "react";
import "./App.css";
import { monthNames } from "./utils";
import { fish } from "./fish";
import { FishPanel } from "./fishPanel";
import { TimeSelect } from "./timeSelect";

const getInitialMonth = () => {
  var currentTime = new Date();
  return currentTime.getMonth();
};

const getInitialTime = () => {
  var currentTime = new Date();
  return { hrs: currentTime.getHours(), mins: currentTime.getMinutes() };
};

const separateFish = fish => {
  let river = [],
    pond = [],
    sea = [],
    clifftop = [],
    rivermouth = [],
    pier = [];
  fish.forEach(f => {
    const loc = f.location.toLowerCase();
    if (loc == "river") {
      river.push(f);
    } else if (loc == "pond") {
      pond.push(f);
    } else if (loc == "sea") {
      sea.push(f);
    } else if (loc == "clifftop") {
      clifftop.push(f);
    } else if (loc == "rivermouth") {
      rivermouth.push(f);
    } else if (loc == "pier") {
      pier.push(f);
    } else {
      console.error("uncategorised fish location, something went wrong", f);
    }
  });
  return { river, pond, sea, clifftop, rivermouth, pier };
};

const filterFish = (month, time, hemisphere) => {
  const monthVar = hemisphere == "N" ? "months_nth" : "months_sth";
  return fish.filter(f => {
    if (
      f[monthVar][0] == "all" ||
      f[monthVar].includes(monthNames[month].short)
    ) {
      if (f.time.is_all_day) {
        return true;
      } else {
        let inTime = false;
        f.time.times.forEach(t => {
          const start = parseInt(t.time_start);
          const end = parseInt(t.time_end);
          const timeInt = parseInt(time);
          if (start < end) {
            // time is during the day
            if (timeInt > start && time < end && timeInt !== 0) {
              inTime = true;
            }
          } else {
            // time goes over through midnight
            if (timeInt > start || timeInt < end) {
              inTime = true;
            }
          }
        });
        return inTime;
      }
    }
  });
};

function App() {
  const [month, setMonth] = useState(getInitialMonth());
  const [time, setTime] = useState(getInitialTime());
  const [hemisphere, setHemisphere] = useState("N");

  const nowFish = filterFish(month, time.hrs, hemisphere);
  const sortedFish = separateFish(nowFish);
  const arrangedTime = `${time.hrs}:${(parseInt(time.mins) < 10 ? `0${time.mins}` : time.mins)}`;
  // const nowFish = fish;
  return (
    <div className="App">
      <h1>New Horizons Fish Forecast</h1>
      <p> What fish can I catch right now? 🤔</p>
      <br />
      <div>
        <TimeSelect
          time={time}
          onTimeChange={setTime}
          month={month}
          handleMonthChange={setMonth}
          hemisphere={hemisphere}
          handleHemChange={setHemisphere}
        />
      </div>
      <br />
      Here are the fish that will appear at the selected time:
      {sortedFish.sea.length > 0 && (
        <div>
          <h2>Sea</h2>
          <div className={"locGroup"}>
            {sortedFish.sea.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.river.length > 0 && (
        <div>
          <h2>River</h2>
          <div className={"locGroup"}>
            {sortedFish.river.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.pond.length > 0 && (
        <div>
          <h2>Pond</h2>
          <div className={"locGroup"}>
            {sortedFish.pond.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.clifftop.length > 0 && (
        <div>
          <h2>Clifftop</h2>
          <div className={"locGroup"}>
            {sortedFish.clifftop.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.pier.length > 0 && (
        <div>
          <h2>Pier</h2>
          <div className={"locGroup"}>
            {sortedFish.pier.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.rivermouth.length > 0 && (
        <div>
          <h2>RiverMouth</h2>
          <div className={"locGroup"}>
            {sortedFish.rivermouth.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
