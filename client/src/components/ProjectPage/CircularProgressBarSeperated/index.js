import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import RadialSeparators from "./radialSeperators";

const CircularProgressBarSeperated = ({ value, text }) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      text={`${value}%`}
      strokeWidth={10}
      styles={buildStyles({
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: "butt",

        // Text size
        textSize: "16px",

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',
        // Colors
        pathColor: `rgba(76, 223, 76,1)`,
        textColor: "rgba(76, 223, 76,1",
        trailColor: "rgba(76, 223, 76,.33)"
      })}
    >
      <RadialSeparators
        count={12}
        style={{
          background: "#fff",
          width: "2px",
          // This needs to be equal to props.strokeWidth
          height: `${10}%`
        }}
      />
    </CircularProgressbarWithChildren>
  );
};

export default CircularProgressBarSeperated;
