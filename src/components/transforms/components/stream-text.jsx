import React from "react";
import PropTypes from "prop-types";
// import ReactAnsi from "react-ansi";
import Ansi from "@curvenote/ansi-to-react";

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
      {Array.isArray(text) ? text.join("\n") : text}
    </Ansi>
    // <ReactAnsi log={text} />
  );
};

StreamText.propTypes = {
  output: PropTypes.object,
  linkify: PropTypes.bool,
  useClasses: PropTypes.bool,
  output_type: PropTypes.oneOf(["stream"]),
};

export default StreamText;
