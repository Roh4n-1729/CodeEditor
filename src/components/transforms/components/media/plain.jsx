import React from "react";
import PropTypes from "prop-types";
import ReactAnsi from "react-ansi";
import Ansi from "@curvenote/ansi-to-react";

const Plain = ({ data = "", mediaType = "text/plain" }) => (
  <pre>
    <ReactAnsi log={data} />
    {console.log("dataasdasdas", data)}
    {/* <Ansi linkify>{data}</Ansi> */}
  </pre>
);

Plain.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["text/plain"]),
};

Plain.displayName = "Plaintext";

export default Plain;
