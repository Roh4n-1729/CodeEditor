import React from "react";
import PropTypes from "prop-types";

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
function RichMedia({ data = {}, metadata = {}, children }) {
  return (
    <InnerRichMedia data={data} metadata={metadata}>
      {children}
    </InnerRichMedia>
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
