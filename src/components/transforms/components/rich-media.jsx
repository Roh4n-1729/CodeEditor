import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Default error fallback UI rendered when an error is caught.
 */
function DefaultErrorFallback({ error, componentStack }) {
  return (
    <div
      style={{
        backgroundColor: "ghostwhite",
        color: "black",
        fontWeight: 600,
        display: "block",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>{error.toString()}</h3>
      <details>
        <summary>stack trace</summary>
        <pre>{componentStack}</pre>
      </details>
    </div>
  );
}

DefaultErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  componentStack: PropTypes.string.isRequired,
};

/**
 * Helper function to choose the first child element whose `mediaType`
 * prop matches a key in the provided data.
 */
function chooseChild(children, data) {
  let chosenOne = null;

  React.Children.forEach(children, (child) => {
    if (chosenOne) return;
    if (!React.isValidElement(child)) return;

    // If the child is itself a RichMedia, delegate the choice to its children.
    // We check by displayName to avoid circular reference.
    if (child.type && child.type.displayName === "RichMedia") {
      chosenOne = chooseChild(child.props.children, data);
      return;
    }

    if (child.props && child.props.mediaType && child.props.mediaType in data) {
      chosenOne = child;
    }
  });

  return chosenOne;
}

/**
 * InnerRichMedia performs the core logic of selecting a child to render
 * based on the available media bundle data.
 */
function InnerRichMedia({ data = {}, metadata = {}, children }) {
  if (!data) return null;

  const chosenOne = chooseChild(children, data);

  if (!chosenOne || !chosenOne.props.mediaType) return null;

  const mediaType = chosenOne.props.mediaType;
  return React.cloneElement(chosenOne, {
    data: data[mediaType],
    metadata: metadata[mediaType],
  });
}

InnerRichMedia.propTypes = {
  data: PropTypes.object,
  metadata: PropTypes.object,
  children: PropTypes.node,
};

/**
 * RichMedia wraps InnerRichMedia in an error boundary.
 * If an error is caught, the `renderError` function is used to display it.
 */
function RichMedia({
  data = {},
  metadata = {},
  children,
  renderError = ({ error, info, data, metadata, children }) => (
    <DefaultErrorFallback error={error} componentStack={info.componentStack} />
  ),
}) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary, componentStack }) =>
        renderError({
          error,
          info: { componentStack },
          data,
          metadata,
          children,
        })
      }
    >
      <InnerRichMedia data={data} metadata={metadata}>
        {children}
      </InnerRichMedia>
    </ErrorBoundary>
  );
}

RichMedia.propTypes = {
  data: PropTypes.object,
  metadata: PropTypes.object,
  children: PropTypes.node,
  renderError: PropTypes.func,
};

RichMedia.displayName = "RichMedia";

export default RichMedia;
