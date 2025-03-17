import React from "react";
import PropTypes from "prop-types";
import Ansi from "react-ansi";

const KernelOutputError = ({
  output,
  className,
  linkify = false,
  useClasses = false,
  output_type = "error",
}) => {
  if (!output) return null;

  const { ename, evalue, traceback = [] } = output;
  // If traceback supports join, join it; otherwise, use it as-is.
  const joinedTraceback =
    typeof traceback.join === "function" ? traceback.join("\n") : traceback;

  const kernelOutputError = [];
  if (joinedTraceback) {
    kernelOutputError.push(joinedTraceback);
  } else if (ename && evalue) {
    kernelOutputError.push(`${ename}: ${evalue}`);
  }

  return (
    <div className={className} style={{ whiteSpace: "pre-wrap" }}>
      <Ansi linkify={linkify} useClasses={useClasses}>
        {kernelOutputError.join("\n")}
      </Ansi>
    </div>
  );
};

KernelOutputError.propTypes = {
  output: PropTypes.object,
  className: PropTypes.string,
  linkify: PropTypes.bool,
  useClasses: PropTypes.bool,
  output_type: PropTypes.oneOf(["error"]),
};

KernelOutputError.defaultProps = {
  output: null,
  output_type: "error",
  linkify: false,
  useClasses: false,
};

export default KernelOutputError;
