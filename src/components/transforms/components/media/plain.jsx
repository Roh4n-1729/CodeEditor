import React from "react";
import PropTypes from "prop-types";
import Ansi from "react-ansi";

const Plain = ({ data = "", mediaType = "text/plain" }) => (
  <pre>
    <Ansi linkify>{data}</Ansi>
  </pre>
);

Plain.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["text/plain"]),
};

Plain.displayName = "Plaintext";

export default Plain;
