import React from "react";
import PropTypes from "prop-types";
import RichMedia from "./rich-media";

const ExecuteResult = ({
  output = null,
  children,
  output_type = "execute_result",
}) => {
  if (!output) return null;

  return (
    <RichMedia data={output.data} metadata={output.metadata}>
      {children}
    </RichMedia>
  );
};

ExecuteResult.propTypes = {
  output_type: PropTypes.oneOf(["execute_result"]),
  output: PropTypes.object,
  children: PropTypes.node,
};

export default ExecuteResult;
