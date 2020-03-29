import React, { useState } from "react";
import "./App.css";
import { monthNames } from "./utils";
import { fish } from "./fish";
import { FishPanel } from "./fishPanel";
import { TimeSelect } from "./timeSelect";
import ghIcon from './github.svg';

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
            <div className={'linksbar'}>
      <a href="https://github.com/nicole-8/new_horizons_fish_forecast">
      <img className={'github'} src={ghIcon} alt="Logo" />
      </a>
      </div>
      <h1 className="pageTitle">New Horizons Fish Forecast</h1>
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
      {sortedFish.sea.length > 0 && (
        <div>
          <h2 className={'locTitle'}>Sea</h2>
          <div className={"locGroup"}>
            {sortedFish.sea.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.river.length > 0 && (
        <div>
          <h2 className={'locTitle'}>River</h2>
          <div className={"locGroup"}>
            {sortedFish.river.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.pond.length > 0 && (
        <div>
          <h2 className={'locTitle'}>Pond</h2>
          <div className={"locGroup"}>
            {sortedFish.pond.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.clifftop.length > 0 && (
        <div>
          <h2 className={'locTitle'}>Clifftop</h2>
          <div className={"locGroup"}>
            {sortedFish.clifftop.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.pier.length > 0 && (
        <div>
          <h2 className={'locTitle'}>Pier</h2>
          <div className={"locGroup"}>
            {sortedFish.pier.map(f => {
              return <FishPanel fish={f} />;
            })}
          </div>
        </div>
      )}
      {sortedFish.rivermouth.length > 0 && (
        <div>
          <h2 className={'locTitle'}>River Mouth</h2>
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
