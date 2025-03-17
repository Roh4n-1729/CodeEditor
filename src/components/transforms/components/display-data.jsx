import React from "react";
import PropTypes from "prop-types";
import RichMedia from "./rich-media";

const DisplayData = ({ output, children, output_type = "display_data" }) => {
  if (!output) return null;

  return (
    <RichMedia data={output.data} metadata={output.metadata}>
      {children}
    </RichMedia>
  );
};

DisplayData.propTypes = {
  output_type: PropTypes.oneOf(["display_data"]),
  output: PropTypes.object,
  children: PropTypes.node,
};

export default DisplayData;
