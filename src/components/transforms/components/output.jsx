import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Fallback component rendered if an error occurs.
 * It displays the error message and component stack.
 */
function ErrorFallback({ error, resetErrorBoundary, componentStack }) {
  return (
    <div
      style={{
        backgroundColor: "ghostwhite",
        color: "black",
        fontWeight: "600",
        display: "block",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      {error && <h3>{error.toString()}</h3>}
      <details>
        <summary>stack trace</summary>
        <pre>{componentStack}</pre>
      </details>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
  resetErrorBoundary: PropTypes.func,
  componentStack: PropTypes.string,
};

/**
 * OutputContent handles the core logic:
 *  - If no output is provided, it renders nothing.
 *  - Otherwise, it finds the first child element whose `output_type` prop matches the
 *    output’s `output_type`, and then clones it, passing the output as a prop.
 */
const OutputContent = ({ output, children }) => {
  if (!output) return null;

  const outputType = output.output_type;

  let chosenOne = null;
  React.Children.forEach(children, (child) => {
    if (chosenOne) return;
    if (!React.isValidElement(child)) return;

    const childOutputType = child.props.output_type;
    if (childOutputType) {
      const childTypes = Array.isArray(childOutputType)
        ? childOutputType
        : [childOutputType];
      if (childTypes.includes(outputType)) {
        chosenOne = child;
      }
    }
  });

  if (!chosenOne) return null;
  return React.cloneElement(chosenOne, { output });
};

OutputContent.propTypes = {
  output: PropTypes.object,
  children: PropTypes.node,
};

/**
 * The main Output component.
 * It wraps the rendering logic with an error boundary so that any errors are caught
 * and handled by the provided `renderError` function (defaulting to ErrorFallback).
 */
const Output = ({ output = null, children, renderError = ErrorFallback }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary, componentStack }) =>
        renderError({ error, info: { componentStack }, output, children })
      }
    >
      <OutputContent output={output} children={children} />
    </ErrorBoundary>
  );
};

Output.propTypes = {
  output: PropTypes.object,
  children: PropTypes.node,
  renderError: PropTypes.func,
};

export default Output;
