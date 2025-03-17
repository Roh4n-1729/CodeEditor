import React from "react";
import PropTypes from "prop-types";
import Ansi from "react-ansi";

const StreamText = ({
  output,
  linkify = true,
  useClasses,
  output_type = "stream",
}) => {
  if (!output) return null;

  const { text, name } = output;

  return (
    <Ansi
      linkify={linkify}
      className={`nteract-display-area-${name}`}
      useClasses={useClasses}
    >
      {text}
    </Ansi>
  );
};

StreamText.propTypes = {
  output: PropTypes.object,
  linkify: PropTypes.bool,
  useClasses: PropTypes.bool,
  output_type: PropTypes.oneOf(["stream"]),
};

export default StreamText;
