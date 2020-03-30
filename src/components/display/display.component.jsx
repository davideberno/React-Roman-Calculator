import React from "react";

import AutoScalingText from "../autoscaling-text/autoscaling-text.component";

import "./display.styles.scss";

const Display = ({ displayMain, displayOps }) => (
  <div className="display">
    <AutoScalingText up>
      <nobr>{displayOps}</nobr>
    </AutoScalingText>
    <AutoScalingText>{displayMain}</AutoScalingText>
  </div>
);

export default Display;
