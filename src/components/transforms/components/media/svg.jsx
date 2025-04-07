// to be done later
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SVG = ({ data = "", mediaType = "image/svg+xml" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Remove all existing children
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      // Insert the new SVG content
      container.insertAdjacentHTML("beforeend", data);
    }
  }, [data]);

  return <div ref={containerRef} />;
};

SVG.propTypes = {
  data: PropTypes.string,
  mediaType: PropTypes.oneOf(["image/svg+xml"]),
};

export default SVG;
