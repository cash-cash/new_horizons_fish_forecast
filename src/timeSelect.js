import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { monthNames } from "./utils";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';

export const TimeSelect = props => {
  const { time, onTimeChange, month, handleMonthChange, hemisphere, handleHemChange } = props;

  const handleTimeChange = event => {
    var res = event.target.value.split(":");
    const hr = res[0];
    const min = res[1];
    onTimeChange({ hrs: hr, mins: min });
  };
  return (
      <div className={"centerer"}>
    <Paper className={"timeSelect"}>
      <TextField
        id="time"
        type="time"
        defaultValue={`${time.hrs}:${(time.mins < 10 ? `0${time.mins}` : time.mins)}`}
        className={"none"}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleTimeChange}
        inputProps={{
          step: 300 // 5 min
        }}
      />

      <Select
        value={month}
        onChange={(e) => {
          handleMonthChange(e.target.value)
        }}
      >
        {monthNames.map((m, i) => {
          return (
            <MenuItem key={i} value={i}>
              {m.full}
            </MenuItem>
          );
        })}
      </Select>

      <RadioGroup name="hemisphere" value={hemisphere} onChange={(e) => {handleHemChange(e.target.value)}}>
        <FormControlLabel value="N" control={<Radio />} label="Northern Hemisphere" />
        <FormControlLabel value="S" control={<Radio />} label="Southern Hemisphere" />
      </RadioGroup>
    </Paper>
    </div>
  );
};
